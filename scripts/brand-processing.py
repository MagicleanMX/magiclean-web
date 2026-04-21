#!/usr/bin/env python3
"""
Brand asset processing — Pillow-only (no external deps, no numpy).

Extracts transparent PNG + WebP from the 3 raster sources in
`public/images/brand/_source/` using per-asset color-keying:

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
SRC = ROOT / "public/images/brand/_source"
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
    src = Image.open(SRC / "magiclean-logo.source.png").convert("RGB")
    r, g, b = src.split()
    lum = ImageMath.lambda_eval(lambda a: a["convert"]((a["r"] + a["g"] + a["b"]) / 3, "L"), r=r, g=g, b=b)
    max_c = ImageChops.lighter(ImageChops.lighter(r, g), b)
    min_c = ImageChops.darker(ImageChops.darker(r, g), b)
    chroma = ImageChops.subtract(max_c, min_c)
    alpha_lum = linear_alpha(lum, 210, 235, invert=True)
    alpha_chroma = linear_alpha(chroma, 40, 80, invert=False)
    alpha = ImageChops.lighter(alpha_lum, alpha_chroma)
    img = Image.merge("RGBA", (r, g, b, alpha))
    img = crop_to_content(img)
    img = resize_maxdim(img, 2000)
    return save_dual(img, DST / "logo", "magiclean-logo")


def process_monograma():
    src = Image.open(SRC / "magiclean-mc.source.png").convert("RGB")
    _, s, _ = src.convert("HSV").split()
    alpha = linear_alpha(s, 15, 60).filter(ImageFilter.GaussianBlur(radius=1))
    r, g, b = src.split()
    img = Image.merge("RGBA", (r, g, b, alpha))
    img = crop_to_content(img)
    return save_dual(img, DST / "isotipo", "magiclean-mc")


def process_neoshield():
    src = Image.open(SRC / "neoshield-badge.source.png").convert("RGB")
    r, g, b = src.split()
    lum = ImageMath.lambda_eval(lambda a: a["convert"]((a["r"] + a["g"] + a["b"]) / 3, "L"), r=r, g=g, b=b)
    alpha = linear_alpha(lum, 30, 60)
    img = Image.merge("RGBA", (r, g, b, alpha))
    img = crop_to_content(img)
    return save_dual(img, DST / "neoshield", "neoshield-badge")


if __name__ == "__main__":
    for name, fn in [("logo", process_logo), ("isotipo", process_monograma), ("neoshield", process_neoshield)]:
        png_sz, webp_sz, mode = fn()
        print(f"  {name:10s}  PNG {png_sz/1024:7.1f} KB   WebP {webp_sz/1024:6.1f} KB ({mode})")
