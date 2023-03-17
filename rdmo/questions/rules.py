import logging


import rules

from rdmo.management.rules import is_an_editor,is_element_editor, is_multisite_editor, \
                                    is_a_reviewer, is_element_reviewer, is_multisite_reviewer

logger = logging.getLogger(__name__)


# Permissions for questions app

# Model permissions for catalogs
rules.add_perm('questions.view_catalog', is_an_editor | is_a_reviewer)
rules.add_perm('questions.add_catalog', is_an_editor)
rules.add_perm('questions.change_catalog', is_an_editor)
rules.add_perm('questions.delete_catalog', is_an_editor)

# Object permissions for catalogs
rules.add_perm('questions.view_catalog_object', is_an_editor | is_element_reviewer | is_multisite_reviewer)
rules.add_perm('questions.add_catalog_object', is_element_editor | is_multisite_editor)
rules.add_perm('questions.change_catalog_object', is_element_editor | is_multisite_editor)
rules.add_perm('questions.delete_catalog_object', is_element_editor | is_multisite_editor)

# Model permissions for sections
rules.add_perm('questions.view_section', is_an_editor | is_a_reviewer)
rules.add_perm('questions.add_section', is_an_editor)
rules.add_perm('questions.change_section', is_an_editor)
rules.add_perm('questions.delete_section', is_an_editor)

# Object permissions for sections
rules.add_perm('questions.view_section_object', is_an_editor | is_element_reviewer | is_multisite_reviewer)
rules.add_perm('questions.add_section_object', is_element_editor | is_multisite_editor)
rules.add_perm('questions.change_section_object', is_element_editor | is_multisite_editor)
rules.add_perm('questions.delete_section_object', is_element_editor | is_multisite_editor)

# Model permissions for questionsets
rules.add_perm('questions.view_questionset', is_an_editor | is_a_reviewer)
rules.add_perm('questions.add_questionset', is_an_editor)
rules.add_perm('questions.change_questionset', is_an_editor)
rules.add_perm('questions.delete_questionset', is_an_editor)

# Object permissions for questionsets
rules.add_perm('questions.view_questionset_object', is_an_editor | is_element_reviewer | is_multisite_reviewer)
rules.add_perm('questions.add_questionset_object', is_element_editor | is_multisite_editor)
rules.add_perm('questions.change_questionset_object', is_element_editor | is_multisite_editor)
rules.add_perm('questions.delete_questionset_object', is_element_editor | is_multisite_editor)

# Model permissions for questions
rules.add_perm('questions.view_question', is_an_editor | is_a_reviewer)
rules.add_perm('questions.add_question', is_an_editor)
rules.add_perm('questions.change_question', is_an_editor)
rules.add_perm('questions.delete_question', is_an_editor)

# Object permissions for questions
rules.add_perm('questions.view_question_object', is_an_editor | is_element_reviewer | is_multisite_reviewer)
rules.add_perm('questions.add_question_object', is_element_editor | is_multisite_editor)
rules.add_perm('questions.change_question_object', is_element_editor | is_multisite_editor)
rules.add_perm('questions.delete_question_object', is_element_editor | is_multisite_editor)
