from backend.models.storage import TempStorage


def test_temp_storage():
    storage = TempStorage()
    to_store = {"resume_text": "Resume text", "job_description": "Job Description"}
    storage_uid = storage.create(to_store)
    assert storage.read(storage_uid) is not None

    data = storage.read(storage_uid)
    assert data == to_store

    clear = storage.delete(storage_uid)
    assert clear is True
    assert storage.read(storage_uid) is None

    clear = storage.delete(storage_uid)
    assert clear is False
