import { V1AdmissionRequest } from "@jspolicy/types";
import { V1ObjectMeta } from "@kubernetes/client-node";

const disallowedNamespaces = ["default", "kube-system"]

export function validateNamespace(request: V1AdmissionRequest): string[] {
    const object = request.object as {metadata: V1ObjectMeta};
    const errors: string[] = [];

    if (disallowedNamespaces.includes(object?.metadata?.namespace!)) {
        errors.push("Field metadata.namespace is not allowed to be: " + disallowedNamespaces.join(" | "))
    }

    return errors
}
