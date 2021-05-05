import { denyOnErrors } from '../../util/helpers'
import { validateNamespace } from '../../lib/metadata/validateNamespace';

denyOnErrors(
    validateNamespace(request),
);
