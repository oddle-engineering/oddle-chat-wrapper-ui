import { zodToJsonSchema } from "zod-to-json-schema";
import type {
  ComponentSchema,
  GenerativeComponent,
  GenerativeComponents,
} from "../types";

/**
 * Holds the dashboard's registered generative components and exposes:
 *  - the React components, looked up by name when an agent asks to render one;
 *  - their JSON-Schema-converted prop schemas, sent to the chat-server so the
 *    agent knows what props each component accepts.
 *
 * Zod → JSON Schema conversion runs once per registration to avoid repeating
 * the work on every render.
 */
export class ComponentRegistry {
  private readonly entries = new Map<string, GenerativeComponent<any>>();
  private readonly schemas: ComponentSchema[] = [];

  constructor(components: GenerativeComponents = []) {
    components.forEach((c) => this.add(c));
  }

  private add(component: GenerativeComponent<any>): void {
    if (this.entries.has(component.name)) {
      return;
    }
    this.entries.set(component.name, component);
    this.schemas.push({
      name: component.name,
      description: component.description,
      propsSchemaJson: zodToJsonSchema(component.propsSchema, {
        $refStrategy: "none",
      }) as Record<string, any>,
    });
  }

  get(name: string): GenerativeComponent<any> | undefined {
    return this.entries.get(name);
  }

  has(name: string): boolean {
    return this.entries.has(name);
  }

  getSchemas(): ComponentSchema[] {
    return this.schemas;
  }

  size(): number {
    return this.entries.size;
  }
}
