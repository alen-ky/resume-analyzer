//Task 10:Add Validation for Input Types (File Size, Format, Character Count)

//checks if a input file is a pdf and size of <= 2MB
export const isPDF = (file) => {

  const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes

  //if extenstion isn't a pdf file
  if (file.type !== 'application/pdf') {
    alert("invalid file extension. Please upload a pdf file");
    return false;
  }

  //if pdf file is larger than 2MB
  if (file.size > maxFileSize) {
    alert("File size exceedds 2MB. Please upload a smaller file");
    return false;
  }

  return true;
};



//checks whether the test input is <= 5000 characters
export const inputCharLength = (text) => {
  const maxTextLength = 5000;
  if (text.length > maxTextLength ) {
    alert("Please enter less than 5000 characters");
    return false
  }

  return true;
};