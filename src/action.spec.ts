import * as core from "@actions/core";
import { ActionConfig, getConfig } from "./action";

describe("Action", () => {
  describe("getConfig", () => {
    // Represent the process.env inputs.
    let mockEnvConfig: any;

    beforeEach(() => {
      mockEnvConfig = {
        token: "secret",
        base_url: "https://www.test.com",
        folder: "./woo/test",
      };

      jest.spyOn(core, "getInput").mockImplementation((input: string) => {
        switch (input) {
          case "token":
            return mockEnvConfig.token;
          case "base_url":
            return mockEnvConfig.base_url;
          case "folder":
            return mockEnvConfig.folder;
          default:
            throw new Error("invalid input requested");
        }
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should return a valid config", () => {
      const config: ActionConfig = getConfig();

      // Assert that the numbers / types have been properly loaded.
      expect(config.token).toStrictEqual("secret");
      expect(config.base_url).toStrictEqual("https://www.test.com");
      expect(config.folder).toStrictEqual("./woo/test");
    });

    it("should provide a default folder if none is supplied", () => {
      mockEnvConfig.folder = "";
      const config: ActionConfig = getConfig();

      expect(config.folder).toStrictEqual('./');
    });


  });
});
