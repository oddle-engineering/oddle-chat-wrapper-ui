import {
  AskUserInputV0,
  AskUserInputV0PropsSchema,
} from "../components/builtin/AskUserInputV0";
import type { GenerativeComponent, GenerativeComponents } from "../types";

/**
 * Built-in generative components that the chat UI ships with. They are merged
 * into whatever the consumer passes via `generativeComponents` on
 * `<ChatWrapper>` and advertised to the chat-server alongside user-registered
 * components.
 *
 * Consumers can override a built-in by registering a `GenerativeComponent` with
 * the same `name` — see `mergeWithBuiltinComponents` for the ordering rule.
 */

export const askUserInputV0Registration: GenerativeComponent<
  typeof AskUserInputV0PropsSchema
> = {
  name: "AskUserInputV0",
  description:
    "Show a structured form with one or more clarifying questions and a Submit button. Each question is single_choice (pick exactly one) or multi_choice (pick one or more), with 2–6 options. Use whenever you would otherwise ask the user a small, well-defined set of clarifying questions before continuing — e.g. picking a campaign goal, confirming preferences, choosing a tone, narrowing an audience. Set `prompt` to an optional intro, list each question under `questions[]` with `title`, `type`, and `options[]`. Set `option.value` when the answer string sent back should differ from the visible `label`. Answers are collected as the user picks options and sent together as a single message when they click Submit. Do not use this for free-form input, open-ended questions, or ranking interactions.",
  propsSchema: AskUserInputV0PropsSchema,
  component: AskUserInputV0,
};

export const BUILTIN_GENERATIVE_COMPONENTS: GenerativeComponents = [
  askUserInputV0Registration,
];

/**
 * Merge consumer-supplied generative components with the library's built-ins.
 *
 * Ordering matters: `ComponentRegistry.add` is first-write-wins, so consumer
 * components are placed first to let an app override a built-in by registering
 * a component with the same name.
 */
export function mergeWithBuiltinComponents(
  user?: GenerativeComponents,
): GenerativeComponents {
  return [...(user ?? []), ...BUILTIN_GENERATIVE_COMPONENTS];
}
