import tesseract from "tesseract.js";
const  extractTextFromImage= async (imagePath)=>{
    try{
        const text=await tesseract.recognize(
            imagePath,
            "eng",
        )
        return text.data.text;
    } catch (error) {
        console.error("Error extracting text from image:", error);
        process.exit(1);
    }
}

export default extractTextFromImage;