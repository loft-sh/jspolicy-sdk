import { V1Container, V1PodSpec } from "@kubernetes/client-node";

const allowedImagePattern = "^ghcr\.io/mycompany/.*"
const allowedImageRegex = new RegExp(allowedImagePattern)

export function validateContainerImages(podSpec?: V1PodSpec): string[] {
    const errors: string[] = [];
    
    podSpec?.containers?.forEach((container: V1Container, index: number) => {
        if (container.image?.match(allowedImageRegex)?.length != 1) {
            errors.push("Field spec.containers[" + index + "].image must match regex: " + allowedImagePattern)
        }
    })
    
    podSpec?.initContainers?.forEach((container: V1Container, index: number) => {
        if (container.image?.match(allowedImageRegex)?.length != 1) {
            errors.push("Field spec.initContainers[" + index + "].image must match regex: " + allowedImagePattern)
        }
    })
    
    return errors;
}
