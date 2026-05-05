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
    "Show a structured clarifying-question form with radio (single_choice) and/or checkbox (multi_choice) controls. Use whenever you would otherwise ask the user a small, well-defined set of clarifying questions before continuing — e.g. picking a campaign goal, confirming preferences, choosing a tone, narrowing an audience. Set `prompt` to an optional intro, list each question under `questions[]` with `title`, `type`, and `options[]` (2–6). Set `option.value` when the answer string sent back should differ from the visible `label`. Set `helperText` to override the default \"Pick one\" / \"Pick one or more\" hint shown inline after the title. Set `allowFreeText: true` on a question to render a text input below the options where the user can type their own answer in their own words; for single_choice the input is mutually exclusive with the radio picks (typing deselects radios), for multi_choice the typed text combines with any selected checkboxes. A question may use `allowFreeText: true` with no `options[]` to render as a pure text-input prompt. When you provide multiple `questions[]`, the form reveals them progressively inline: only the first question shows initially, and each subsequent question appears once the user picks an option or types into the input on the previous one. All revealed questions stay editable, so the user can change earlier answers before submitting. A single Submit button appears once every question is revealed and the required ones answered; clicking it sends all collected answers as a single message. The form locks after submit (the user cannot revise their answer); render a fresh AskUserInputV0 if you need a follow-up question. Do not use this for purely conversational free-form input or ranking interactions.",
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
