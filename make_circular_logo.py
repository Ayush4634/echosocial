from PIL import Image, ImageDraw, ImageOps

def crop_to_circle(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    
    # Create mask
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + img.size, fill=255)
    
    # Apply mask
    output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
    output.putalpha(mask)
    
    output.save(output_path)
    print(f"Created circular logo at {output_path}")

if __name__ == "__main__":
    crop_to_circle("d:/echo-social5/echo-social/public/Bs.png", "d:/echo-social5/echo-social/public/Bs_circle.png")
