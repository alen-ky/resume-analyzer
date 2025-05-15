from backend.resume_upload.resume_upload_controller import parse_pdf
import requests


def test_parse_pdf():
    response = requests.get("https://announcements.asx.com.au/asxpdf/20171108/pdf/43p1l61zf2yct8.pdf")
    response = parse_pdf(response.content)
    assert response is not None
