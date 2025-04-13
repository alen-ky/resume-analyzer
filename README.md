# resume-analyzer
This is a tool that accepts a Resume file (pdf, docx, txt formats supported) and a text input for a job description.
Both files would then be analyzed and give you a fit score, as well as improvement suggestions


# How to Set Up the Project


### How To Run the Backend Server
1. Run
   `python3 -m venv venv` (Mac, Linux) or
   `venv\Scripts\activate` (Windows)
   while in the backend directory.
4. After initializing the virtual environment, it should create a folder in your directory called <b>venv</b>.
5. Next, if the virtual environment did not activate for you, run `source venv/bin/activate`.
6. In your cli, you should see <b>(venv)</b> at the beginning of the prompt.
7. Then, run `pip install -r requirements.txt`. This will install all the packages necessary to run the project.
8. To run the API, in your console type in `uvicorn backend.app:app --reload`. This should enable the FastAPI endpoints on port 8000. To see the
   swagger with all the explanation head to <b>localhost:8000/docs</b>.


### How to Run the Frontend Server
1. Run `npm start` while in the frontend directory.
2. If any errors are encountered, run `npm install` and try `npm start` again.
3. You should be taken to Resume Upload page, that would allow you to paste Job Description and attach Resume.
