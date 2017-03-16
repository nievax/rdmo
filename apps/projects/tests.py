from django.test import TestCase
from django.utils import translation
from django.core.urlresolvers import reverse

from apps.core.testing.mixins import (
    TestUpdateViewMixin,
    TestDeleteViewMixin,
    TestModelViewMixin,
    TestModelStringMixin
)

from .models import Project, Membership


class ProjectsTestCase(TestCase):

    lang = 'en'

    fixtures = (
        'users.json',
        'groups.json',
        'accounts.json',
        'conditions.json',
        'domain.json',
        'options.json',
        'questions.json',
        'tasks.json',
        'views.json',
        'projects.json',
    )

    users = (
        ('owner', 'owner'),
        ('manager', 'manager'),
        ('author', 'author'),
        ('guest', 'guest'),
        ('user', 'user'),
        ('anonymous', None),
    )


class ProjectTests(TestModelViewMixin, TestModelStringMixin, ProjectsTestCase):
    instances = Project.objects.filter(pk=1)

    url_names = {
        'list': 'projects',
        'retrieve': 'project',
        'create': 'project_create',
        'update': 'project_update',
        'delete': 'project_delete'
    }
    status_map = {
        'list': {
            'owner': 200, 'manager': 200, 'author': 200, 'guest': 200, 'user': 200, 'anonymous': 302,
        },
        'retrieve': {
            'owner': 200, 'manager': 200, 'author': 200, 'guest': 200, 'user': 403, 'anonymous': 302
        },
        'create': {
            'get': {
                'owner': 200, 'manager': 200, 'author': 200, 'guest': 200, 'user': 200, 'anonymous': 302
            },
            'post': {
                'owner': 302, 'manager': 302, 'author': 302, 'guest': 302, 'user': 302, 'anonymous': 302
            }
        },
        'update': {
            'get': {
                'owner': 200, 'manager': 200, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            },
            'post': {
                'owner': 302, 'manager': 302, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            }
        },
        'delete': {
            'get': {
                'owner': 200, 'manager': 403, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            },
            'post': {
                'owner': 302, 'manager': 403, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            }
        }
    }

    api_url_name = 'projects:project'
    api_status_map = {
        'list': {'editor': 200, 'reviewer': 200, 'user': 403, 'guest': 403},
        'retrieve': {'editor': 200, 'reviewer': 200, 'user': 403, 'guest': 403},
        'create': {'editor': 201, 'reviewer': 403, 'user': 403, 'guest': 403},
        'update': {'editor': 200, 'reviewer': 403, 'user': 403, 'guest': 403},
        'delete': {'editor': 204, 'reviewer': 403, 'user': 403, 'guest': 403}
    }


class MembershipTests(TestUpdateViewMixin, TestDeleteViewMixin, TestModelStringMixin, ProjectsTestCase):

    project_id = 1

    instances = Membership.objects.filter(project__pk=project_id)

    url_names = {
        'create': 'membership_create',
        'update': 'membership_update',
        'delete': 'membership_delete'
    }
    status_map = {
        'create': {
            'get': {
                'owner': 200, 'manager': 403, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            },
            'post': {
                'owner': 302, 'manager': 403, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            }
        },
        'update': {
            'get': {
                'owner': 200, 'manager': 403, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            },
            'post': {
                'owner': 302, 'manager': 403, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            }
        },
        'delete': {
            'get': {
                'owner': 200, 'manager': 403, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            },
            'post': {
                'owner': 302, 'manager': 403, 'author': 403, 'guest': 403, 'user': 403, 'anonymous': 302
            }
        }
    }

    def test_create_view_post(self):
        translation.activate(self.lang)

        for username, password in self.users:
            if password:
                self.client.login(username=username, password=password)

            for role in ['owner', 'manager', 'author', 'guest']:
                url = reverse(self.url_names['create'], args=[self.project_id])
                data = {
                    'username_or_email': 'user',
                    'role': role
                }
                response = self.client.post(url, data)

                try:
                    self.assertEqual(response.status_code, self.status_map['create']['post'][username])
                    try:
                        Membership.objects.get(user__username='user', role=role).delete()
                    except Membership.DoesNotExist:
                        pass
                except AssertionError:
                    print(
                        ('test', 'test_create_view_post'),
                        ('username', username),
                        ('url', url),
                        ('data', data),
                        ('status_code', response.status_code),
                        ('content', response.content)
                    )
                    raise

            self.client.logout()

    def get_update_url_args(self, instance):
        return [self.project_id, instance.pk]

    def get_delete_url_args(self, instance):
        return [self.project_id, instance.pk]