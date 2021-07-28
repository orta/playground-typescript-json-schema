import type { PlaygroundPlugin, PluginUtils } from "./vendor/playground";
import * as TJS from "./lib/typescript-json-schema";

const makePlugin = (utils: PluginUtils) => {
  const customPlugin: PlaygroundPlugin = {
    id: "json-schema",
    displayName: "JSON Schema",
    didMount: (sandbox, container) => {
      // Create a design system object to handle
      // making DOM elements which fit the playground (and handle mobile/light/dark etc)
      const ds = utils.createDesignSystem(container);

      ds.title("TS -> JSON Schema");
      ds.p(
        "This plugin uses a <a href='https://github.com/orta/playground-typescript-json-schema/tree/master/src/lib' target='_blank'>custom</a> build of <a href='https://github.com/YousefED/typescript-json-schema' target='_blank'>YousefED/typescript-json-schema</a> (at commit <a href ='https://github.com/YousefED/typescript-json-schema/tree/20a03a2d2fe81bea56a895cee7975f87fbf480f8' target='_blank'>20a03a2</a> to output the JSON schema version of your exported interfaces/types from the Playground editor."
        );

      const startButton = document.createElement("input");
      startButton.type = "button";
      startButton.value = "Convert to JSON Schema";
      container.appendChild(startButton);

      const div = document.createElement("div");
      const codeDS = utils.createDesignSystem(div);
      container.appendChild(div);

      startButton.onclick = async () => {
        const settings: TJS.PartialArgs = {
          ignoreErrors: true,
        };

        const program: any = await sandbox.createTSProgram();
        // We can either get the schema for one file and one type...
        const schema = TJS.generateSchema(program, "*", settings);
        codeDS.clear();
        codeDS.code(JSON.stringify(schema, null, "    "));
      };
    },

    modelChangedDebounce: async (_sandbox, _model) => {
      // Do some work with the new text
    },

    // Gives you a chance to remove anything set up,
    // the container itself if wiped of children after this.
    didUnmount: () => {
      console.log("De-focusing plugin");
    },
  };

  return customPlugin;
};

export default makePlugin;
