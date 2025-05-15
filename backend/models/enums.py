from enum import Enum


class Status(Enum):
    Success = "Success"
    Error = "Error"


class ResumeUploadMessages(Enum):
    TooLarge = (
        "Your file size exceeds our 2 MB limit. Please try uploading a different file."
    )
    NotAPdf = "Invalid file type. Only PDF files are allowed."
    ResumeUploadSuccess = "Resume uploaded successfully."
    JobDescriptionUploadSuccess = "Job description submitted successfully."
    JobDescriptionUploadFailure = "Job description exceeds character limit."


class UserSignUpMessages(Enum):
    EmailExists = "Email already exists."
    RegisteredSuccessfully = "User registered successfully."


class UserLogin(Enum):
    InvalidCredentials = "Invalid email or password."
