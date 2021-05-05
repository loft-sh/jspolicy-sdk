import { V1Deployment, V1StatefulSet } from '@kubernetes/client-node';
import { denyOnErrors } from '../../util/helpers'
import { validateContainerCapabilities } from '../../lib/containers/validateCapabilities';
import { validateContainerImages } from '../../lib/containers/validateImages';

const deployment = request.object as V1Deployment | V1StatefulSet;

denyOnErrors(
    validateContainerImages(deployment?.spec?.template?.spec),
    validateContainerCapabilities(deployment?.spec?.template?.spec),
);
