from backend.models.enums import Status, UserSignUpMessages
from tests.backend.base_client import TestApiBaseClient


def test_signup_success():
    test_client = TestApiBaseClient()
    payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword"
    }
    response = test_client.signup_user(**payload)
    assert response.model_dump() == {
        "message": UserSignUpMessages.RegisteredSuccessfully.value,
        "status": Status.Success.value
    }


def test_signup_email_exists():
    test_client = TestApiBaseClient()
    payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword"
    }

    test_client.signup_user(**payload)
    response = test_client.signup_user(**payload)
    # assert response.status_code == 400
    assert response.model_dump() == {
        "message": UserSignUpMessages.EmailExists.value,
        "status": Status.Error.value
    }


def test_login_success():
    test_client = TestApiBaseClient()
    signup_payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword"
    }
    test_client.signup_user(**signup_payload)

    login_payload = {
        "email": "testuser@example.com",
        "password": "securepassword"
    }
    response = test_client.login_user(**login_payload)
    assert "token" in response.model_dump()


def test_login_invalid_credentials():
    test_client = TestApiBaseClient()

    login_payload = {
        "email": "invalid@example.com",
        "password": "wrongpassword"
    }
    response = test_client.login_user(**login_payload)
    assert response.status == Status.Error.value
