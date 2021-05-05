import { V1AdmissionRequest } from "@jspolicy/types";
import { V1ObjectMeta } from "@kubernetes/client-node";

const createdByAnnotation = "jspolicy.com/createdBy"
const updatedByAnnotation = "jspolicy.com/updatedBy"

export function enforceUserAnnotations(request: V1AdmissionRequest): object {
    if (request?.userInfo?.username) {
        const obj = request.object as {metadata?: V1ObjectMeta};

        if (obj) {
            if (!obj.metadata) {
                obj.metadata = {}
            }
            
            if (!obj?.metadata.annotations) {
                obj.metadata.annotations = {}
            }

            if (request.operation === "CREATE") {
                obj.metadata.annotations[createdByAnnotation] = request.userInfo.username || ""
            }

            if (request.operation === "UPDATE") {
                obj.metadata.annotations[updatedByAnnotation] = request.userInfo.username || ""
            }
        }
        request.object = obj
    }

    return request.object || {}
}
