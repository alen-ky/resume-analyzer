First you will need to initialize a local python environment in the root directory of the project. Run `python3 -m venv venv` while
in the repo folder
After initializing the virtual environment, it should create a folder in your directory called <b>venv</b>
Next, if the virtual environment did not activate for you, run `source venv/bin/activate`
In your cli, you should see <b>(venv)</b> at the beginning of the prompt
Then, run `pip install -r requirements.txt`. This will install all the packages necessary to run the project
To run the backend server, in your console type in `uvicorn main:app --reload`

To run react server, go to frontend/sign-on-form and run `npm install` and then `npm start`