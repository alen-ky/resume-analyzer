import re
import os

from pydantic import BaseModel
# import openai
from dotenv import load_dotenv
from backend.models.storage import TempStorage
from typing import List
import google.generativeai as genai


class ResumeAnalyzerPayload(BaseModel):
    uid: str


class ResumeAnalyzerResult(BaseModel):
    fit_score: str
    feedback: List[str]


def analyze_resume(resume_uid: ResumeAnalyzerPayload):
    temp_storage = TempStorage()
    resume_storage = temp_storage.read(resume_uid.uid)
    load_dotenv()
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(f'''
                                        You are an expert career coach and resume reviewer. Analyze the following resume in the context of the provided job description.

                                        **Instructions:**
                                        - Provide at least 7 detailed, actionable feedback points.
                                        - Each point should be at least 2 sentences and include specific examples or suggestions.
                                        - Cover strengths, weaknesses, and concrete ways to improve the resume for this job.
                                        - Address skills, experience, education, achievements, and formatting.
                                        - Be thorough and constructive, as if mentoring the candidate for a real interview.
                                        - **IMPORTANT:** Do NOT use any markdown, bold, italics, bullet points, or special formatting. Only use plain text.
                                        - Format your response as a simple numbered list, like this:
                                        1. Your first feedback point in plain text.
                                        2. Your second feedback point in plain text.
                                        3. And so on.
                                        - After the feedback, on a new line, provide a single fit score (0-100) in the format: <score>

                                        Format your response as:
                                        1. feedback-point-1
                                        2. feedback-point-2
                                        ...
                                        n. feedback-point-n
                                        <score>

                                        Resume:
                                        {resume_storage.get("resume_text")}

                                        Job Description:
                                        {resume_storage.get("job_description")}''')

    return parse_ai_response(response.text)


def parse_ai_response(ai_response):
    lines = [line.strip()
             for line in ai_response.strip().split('\n') if line.strip()]
    response_text = "\n".join(lines)
    points = re.split(r'\n?\d+\.\s*', response_text)
    points = [p.strip() for p in points if p.strip()]
    if points and points[-1].isdigit():
        score = points[-1]
        feedback_points = points[:-1]
    else:
        score = lines[-1]
        feedback_points = lines[:-1]
    return ResumeAnalyzerResult(feedback=feedback_points, fit_score=score)
