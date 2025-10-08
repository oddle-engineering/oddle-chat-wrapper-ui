# Markdown Demo for ChatWrapper

The ChatWrapper now supports **ReactMarkdown** for rich message formatting! Here are examples you can test:

## 🎯 How to Test Markdown

1. **Launch any demo** from the showcase
2. **Type or copy these examples** into the chat
3. **See real-time markdown rendering** in messages

## 📝 Markdown Examples to Try

### Basic Formatting

```
**Bold text** and *italic text*
This is `inline code` in a sentence
```

### Headers

```
# Main Title
## Subtitle 
### Smaller Title
```

### Lists

```
- Bullet point 1
- Bullet point 2
  - Nested item
- Bullet point 3

1. Numbered item
2. Another item
3. Final item
```

### Code Blocks

```
Here's a code block:
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
```

### Blockquotes

```
> This is an important quote
> that spans multiple lines
```

### Mixed Content Example

```
# Marketing Brief for New Product Launch

## Overview
We need to create a **comprehensive marketing strategy** for our upcoming product launch.

### Key Tasks:
1. Research target audience
2. Develop messaging framework
3. Create content calendar
4. Set up tracking metrics

### Timeline
- **Week 1**: Market research
- **Week 2**: Content creation
- **Week 3**: Campaign launch

### Code Integration
```python
def track_engagement(campaign_id):
    return analytics.get_metrics(campaign_id)
```

> **Note**: All metrics should be tracked daily during the campaign period.

For more details, see our `marketing-guidelines.md` file.
```

## 🧠 Reasoning Component

The ChatWrapper also includes a **Reasoning component** that shows when the AI is thinking:

- Displays during streaming responses
- Shows a collapsible "Planning Brief" section
- Includes animated spinner and status text
- Updates in real-time with reasoning content

## 🖼️ Media Support

The ChatWrapper supports image attachments (displayed in a grid layout):

- User messages can include images
- Images are displayed in a responsive grid
- Hover effects for better UX
- Supports multiple images per message

## 💡 Tips for Developers

### Custom Styling
All markdown elements use ChatWrapper CSS classes:
- `.chat-wrapper__heading-1`, `.chat-wrapper__heading-2`, etc.
- `.chat-wrapper__code-block` for code blocks
- `.chat-wrapper__inline-code` for inline code
- `.chat-wrapper__list` and `.chat-wrapper__list-item` for lists

### Dark Theme Support
All markdown elements automatically adapt to dark/light themes using the `chat-wrapper--dark` class.

### Customization
You can override any markdown component by modifying the `ReactMarkdown` components prop in `ChatWrapper.tsx`.

## 🎨 Loader Components

Three loader variants are available:
- `dots` - Animated dot sequence
- `pulse` - Pulsing circle
- `spinner` - Rotating spinner

Use them like: `<Loader size={16} variant="dots" />`