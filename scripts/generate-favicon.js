const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function generateFavicons() {
  const svgPath = path.join(__dirname, "..", "public", "logo_coopcentral.svg");
  const publicDir = path.join(__dirname, "..", "public");

  if (!fs.existsSync(svgPath)) {
    console.error("logo_coopcentral.svg no encontrado en public/");
    return;
  }

  try {
    // Leer y procesar el SVG para extraer solo el cactus
    let svgContent = fs.readFileSync(svgPath, "utf8");

    // Crear versión simplificada eliminando texto
    svgContent = svgContent.replace(/<text[\s\S]*?<\/text>/g, "");
    svgContent = svgContent.replace(/<tspan[\s\S]*?<\/tspan>/g, "");

    // Ajustar viewBox para centrar mejor el cactus (valores aproximados)
    svgContent = svgContent.replace(/viewBox="[^"]*"/, 'viewBox="20 10 60 80"');

    const svgBuffer = Buffer.from(svgContent);

    // Generar favicon-16x16.png
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, "favicon-16x16.png"));

    // Generar favicon-32x32.png
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, "favicon-32x32.png"));

    // Generar apple-touch-icon.png
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, "apple-touch-icon.png"));

    // Generar favicon.ico
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, "favicon.ico"));

    // Guardar SVG procesado para referencia
    fs.writeFileSync(path.join(publicDir, "favicon-cactus.svg"), svgContent);

    console.log("Favicons del cactus generados exitosamente!");
  } catch (error) {
    console.error("Error generando favicons:", error);
  }
}

generateFavicons();
