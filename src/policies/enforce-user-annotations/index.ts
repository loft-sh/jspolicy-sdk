import { enforceUserAnnotations } from "../../lib/metadata/enforceUserAnnotation";

if (request.object) {
    request.object = enforceUserAnnotations(request)

    mutate(request.object)
}
