import { V1PodSpec } from "@kubernetes/client-node";
import { validateContainerCapabilities } from "../src/lib/containers/validateCapabilities";

describe("Test containerSpec.securityContext.capabilities", () => {
    test("Check containers", () => {
        const podSpec : V1PodSpec = {
            containers: [
                {
                    name: "container",
                    securityContext: {
                        capabilities: {
                            add: ["NET_ADMIN"]
                        }
                    }
                }
            ]
        }
        expect(validateContainerCapabilities(podSpec)).toHaveLength(1);
    });

    test("Check initContainers", () => {
        const podSpec : V1PodSpec = {
            containers: [],
            initContainers: [
                {
                    name: "container",
                    securityContext: {
                        capabilities: {
                            add: ["NET_ADMIN"]
                        }
                    }
                }
            ]
        }
        expect(validateContainerCapabilities(podSpec)).toHaveLength(1);
    });

    test("Check valid request", () => {
        const podSpec : V1PodSpec = {
            containers: [
                {
                    name: "container"
                }
            ]
        }
        expect(validateContainerCapabilities(podSpec)).toHaveLength(0);
    });
});

