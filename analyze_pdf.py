#!/usr/bin/env python3
import fitz  # PyMuPDF
import json
from pathlib import Path

pdf_path = "/app/mohawk_design.pdf"
output_dir = Path("/app/pdf_images")
output_dir.mkdir(exist_ok=True)

# Open PDF
doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")
print(f"\nExtracting first 8 pages as images...\n")

# Extract first 8 pages as images
for page_num in range(min(8, len(doc))):
    page = doc[page_num]
    
    # Get page info
    print(f"Page {page_num + 1}:")
    print(f"  Size: {page.rect.width} x {page.rect.height}")
    
    # Extract text
    text = page.get_text()
    text_preview = ' '.join(text.split()[:50])
    print(f"  Text preview: {text_preview[:100]}...")
    
    # Convert to image (150 DPI for good quality)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # 2x scale = ~144 DPI
    image_path = output_dir / f"page_{page_num + 1}.png"
    pix.save(str(image_path))
    print(f"  Saved: {image_path}")
    print()

doc.close()

print(f"\nImages saved to: {output_dir}")
print(f"Total images: {len(list(output_dir.glob('*.png')))}")
