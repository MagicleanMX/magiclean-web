#!/usr/bin/env python3
"""
Brand asset processing — Pillow-only (no external deps, no numpy).

Extracts transparent PNG + WebP from the 3 raster sources in
`project-log/brand-sources/` using per-asset color-keying:

  • magiclean-logo.source.png  → white-background threshold (lum 210-235)
                                 + chroma boost (40-80) to preserve red/blue letter edges.
  • magiclean-mc.source.png    → HSV saturation mask (15-60) with GaussianBlur(1)
                                 on alpha for anti-aliased edges.
  • neoshield-badge.source.png → black-background threshold (lum 30-60).

Outputs are written to `public/images/brand/{logo,isotipo,neoshield}/`.
WebP is saved in whichever of (Q85 lossy / lossless) yields the smaller file.

Run: `python3 scripts/brand-processing.py`
"""
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageChops, ImageMath, ImageFilter
except ImportError:
    sys.exit("Pillow required: pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
# Sources moved out of public/ to keep them off the deploy surface.
SRC = ROOT / "project-log/brand-sources"
DST = ROOT / "public/images/brand"


def crop_to_content(img: Image.Image) -> Image.Image:
    bbox = img.getchannel("A").getbbox()
    return img.crop(bbox) if bbox else img


def resize_maxdim(img: Image.Image, max_dim: int) -> Image.Image:
    w, h = img.size
    if max(w, h) <= max_dim:
        return img
    ratio = max_dim / max(w, h)
    return img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)


def clean_alpha(alpha_band, floor: int = 40, boost: float = 1.3):
    """Zero-out ghost halo pixels (alpha < floor) and boost remaining alpha
    so anti-aliased letter edges stay crisp. Applied AFTER the luminance/
    saturation masks — bridges the gap between 'partially killed' halo
    pixels and 'fully transparent'."""
    lut = [0 if v < floor else min(int(v * boost), 255) for v in range(256)]
    return alpha_band.point(lut)


def unify_blue_to_target(img_rgba: Image.Image, target_hex: str = "#0076FF") -> Image.Image:
    """Replace blue-hued pixels with a target color (default: system primary
    #0076FF), preserving anti-aliased edges.

    Strategy: build a per-pixel weight from (hue in blue range) × (saturation
    above noise floor). Where weight > 0, lerp the RGB channels toward the
    target. Where weight = 0 (red letters, white outline, alpha'd pixels),
    leave the pixel untouched.

    Red channels stay red, 3D white outline stays white, only the blue
    letters and their antialiased transitions shift tone."""
    tr = int(target_hex[1:3], 16)
    tg = int(target_hex[3:5], 16)
    tb = int(target_hex[5:7], 16)

    r, g, b, a = img_rgba.split()
    rgb = Image.merge("RGB", (r, g, b))
    h, s, _ = rgb.convert("HSV").split()

    # Blue hue weight (PIL scale 0-255):
    #   full strength at 140-170, trapezoid feathers 125→140 and 170→180.
    #   Source logo blue is hue 142; target #0076FF is hue 150. Plenty of margin.
    def hue_weight(x: int) -> int:
        if x < 125 or x > 180:
            return 0
        if x < 140:
            return int(255 * (x - 125) / 15)
        if x > 170:
            return int(255 * (180 - x) / 10)
        return 255
    h_mask = h.point([hue_weight(x) for x in range(256)])

    # Saturation gate: drops to 0 below 40 (white-ish), 255 above 100.
    # Prevents accidental blue-shift of near-white antialiasing pixels that
    # happen to share the blue hue due to numerical noise.
    s_mask = s.point([min(255, max(0, (x - 40) * 4)) for x in range(256)])

    weight = ImageChops.multiply(h_mask, s_mask)

    target_r = Image.new("L", rgb.size, tr)
    target_g = Image.new("L", rgb.size, tg)
    target_b = Image.new("L", rgb.size, tb)
    new_r = Image.composite(target_r, r, weight)
    new_g = Image.composite(target_g, g, weight)
    new_b = Image.composite(target_b, b, weight)

    return Image.merge("RGBA", (new_r, new_g, new_b, a))


def linear_alpha(band, low, high, invert=False):
    if invert:
        return ImageMath.lambda_eval(
            lambda a: a["convert"](a["max"](a["min"](255 * (high - a["v"]) / (high - low), 255), 0), "L"),
            v=band,
        )
    return ImageMath.lambda_eval(
        lambda a: a["convert"](a["max"](a["min"](255 * (a["v"] - low) / (high - low), 255), 0), "L"),
        v=band,
    )


def save_dual(img: Image.Image, out_dir: Path, stem: str):
    out_dir.mkdir(parents=True, exist_ok=True)
    png = out_dir / f"{stem}.png"
    webp = out_dir / f"{stem}.webp"
    webp_lossless = out_dir / f"{stem}.lossless.webp"
    img.save(png, "PNG", optimize=True, compress_level=9)
    img.save(webp, "WEBP", quality=85, method=6)
    img.save(webp_lossless, "WEBP", lossless=True, method=6)
    if webp_lossless.stat().st_size < webp.stat().st_size:
        webp.unlink()
        webp_lossless.rename(webp)
        mode = "lossless"
    else:
        webp_lossless.unlink()
        mode = "Q85"
    return png.stat().st_size, webp.stat().st_size, mode


def process_logo():
    """Logo uses rembg (AI-based background removal) because the source has
    halftone-pattern halo that no Pillow threshold+morphology combination can
    cleanly separate from the letters. After rembg strips the halo + white
    background cleanly, Pillow handles the downstream blue-unification, crop,
    and resize."""
    try:
        from rembg import remove
    except ImportError as e:
        raise RuntimeError("rembg required for logo processing: pip install rembg") from e

    src = Image.open(SRC / "magiclean-logo.source.png")
    img = remove(src)  # returns RGBA with clean transparent background

    # Shift native logo blue (hue 142, ~#0179B6) to system primary #0076FF.
    # Red letters + white 3D outline untouched — only the blue "Clean" and
    # its antialiased edges shift tone.
    img = unify_blue_to_target(img, "#0076FF")

    img = crop_to_content(img)
    img = resize_maxdim(img, 2000)
    return save_dual(img, DST / "logo", "magiclean-logo")


def process_monograma():
    src = Image.open(SRC / "magiclean-mc.source.png").convert("RGB")
    _, s, _ = src.convert("HSV").split()
    alpha = linear_alpha(s, 15, 60).filter(ImageFilter.GaussianBlur(radius=1))
    alpha = clean_alpha(alpha, floor=40, boost=1.3)
    r, g, b = src.split()
    img = Image.merge("RGBA", (r, g, b, alpha))
    img = crop_to_content(img)
    return save_dual(img, DST / "isotipo", "magiclean-mc")


def process_neoshield():
    src = Image.open(SRC / "neoshield-badge.source.png").convert("RGB")
    r, g, b = src.split()
    lum = ImageMath.lambda_eval(lambda a: a["convert"]((a["r"] + a["g"] + a["b"]) / 3, "L"), r=r, g=g, b=b)
    alpha = linear_alpha(lum, 30, 60)
    alpha = clean_alpha(alpha, floor=30, boost=1.2)
    img = Image.merge("RGBA", (r, g, b, alpha))
    img = crop_to_content(img)
    return save_dual(img, DST / "neoshield", "neoshield-badge")


if __name__ == "__main__":
    for name, fn in [("logo", process_logo), ("isotipo", process_monograma), ("neoshield", process_neoshield)]:
        png_sz, webp_sz, mode = fn()
        print(f"  {name:10s}  PNG {png_sz/1024:7.1f} KB   WebP {webp_sz/1024:6.1f} KB ({mode})")
