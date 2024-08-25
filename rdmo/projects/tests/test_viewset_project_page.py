import pytest

from django.urls import reverse

users = (
    ('owner', 'owner'),
    ('manager', 'manager'),
    ('author', 'author'),
    ('guest', 'guest'),
    ('api', 'api'),
    ('user', 'user'),
    ('site', 'site'),
    ('anonymous', None),
)

view_questionset_permission_map = {
    'owner': [1, 2, 3, 4, 5, 12],
    'manager': [1, 3, 5, 12],
    'author': [1, 3, 5, 12],
    'guest': [1, 3, 5, 12],
    'user': [12],
    'api': [1, 2, 3, 4, 5, 12],
    'site': [1, 2, 3, 4, 5, 12]
}

urlnames = {
    'list': 'v1-projects:project-page-list',
    'detail': 'v1-projects:project-page-detail'
}

projects = [1, 2, 3, 4, 5, 12]
pages = [1]


@pytest.mark.parametrize('username,password', users)
@pytest.mark.parametrize('project_id', projects)
@pytest.mark.parametrize('page_id', pages)
def test_detail(db, client, username, password, project_id, page_id):
    client.login(username=username, password=password)

    url = reverse(urlnames['detail'], args=[project_id, page_id])
    response = client.get(url)

    if project_id in view_questionset_permission_map.get(username, []):
        assert response.status_code == 200
        assert response.json().get('id') == page_id
    else:
        assert response.status_code == 404


def test_detail_order_in_page(db, client):
    project_id = 1
    username = 'owner'
    ordered_page = 16
    ordered_page_question_ids = {
        16: [18, 19, 32, 33, 34, 89, 35, 36, 82]
    }

    client.login(username=username, password=username)

    url = reverse(urlnames['detail'], args=[project_id, ordered_page])
    response = client.get(url)

    data = response.json()
    questions = [i for i in data['elements'] if i['model'] == "questions.question"]
    question_ids = [i['id'] for i in questions]

    assert response.status_code == 200
    assert response.json().get('id') == ordered_page
    assert question_ids == ordered_page_question_ids.get(ordered_page)


def test_detail_page_with_nested_questionsets(db, client):
    project_id = 1
    username = 'owner'
    page_id = 87
    nested_questionsets_id = [90]
    nested_element_ids = [95, 96, 94, 89]

    client.login(username=username, password=username)

    url = reverse(urlnames['detail'], args=[project_id, page_id])
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()
    questionsets = [i for i in data['elements'] if i['model'] == "questions.questionset"]
    questionsets_ids = [i['id'] for i in questionsets]
    assert questionsets_ids == nested_questionsets_id
    element_ids = [i['id'] for qs in questionsets for i in qs['elements']]
    assert element_ids == nested_element_ids
