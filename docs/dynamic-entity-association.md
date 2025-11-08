# Dynamic Entity Association

This guide explains how to dynamically update the `entityId` and `entityType` for a ChatWrapper instance after initialization.

## Use Case

Sometimes you want to start a chat session without an entity (empty chat), and later associate it with an entity when:
- User creates a new entity (brand, account, etc.)
- User selects an existing entity from a list
- Entity is determined based on chat context

## How It Works

The ChatWrapper exposes an imperative handle via React's `ref` that allows you to update the entity association at any time. This updates the underlying authentication data used for:
- WebSocket ticket renewals
- Future API requests
- Access control

## Basic Usage

### 1. Import Required Types

```typescript
import { ChatWrapper, ChatWrapperRef, EntityType } from '@oddle/chat-wrapper';
import { useRef } from 'react';
```

### 2. Create a Ref

```typescript
const chatRef = useRef<ChatWrapperRef>(null);
```

### 3. Pass Ref to ChatWrapper

```typescript
<ChatWrapper
  ref={chatRef}
  userMpAuthToken={token}
  chatServerUrl={wsUrl}
  chatServerKey={serverKey}
  userId={userId}
  // entityId and entityType are optional - can be omitted initially
  config={chatConfig}
  tools={tools}
/>
```

### 4. Update Entity ID Later

```typescript
// When user creates/selects an entity
const handleEntitySelected = (entityId: string) => {
  chatRef.current?.updateEntityId(entityId, EntityType.BRAND);
};
```

## Complete Example

```typescript
import React, { useRef, useState } from 'react';
import { ChatWrapper, ChatWrapperRef, EntityType } from '@oddle/chat-wrapper';

function MyApp() {
  const chatRef = useRef<ChatWrapperRef>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandCreated = (brandId: string) => {
    // Update the state
    setSelectedBrand(brandId);
    
    // Update the chat wrapper's entity association
    chatRef.current?.updateEntityId(brandId, EntityType.BRAND);
    
    console.log(`Chat now associated with brand: ${brandId}`);
  };

  const handleBrandSelected = (brandId: string) => {
    setSelectedBrand(brandId);
    chatRef.current?.updateEntityId(brandId, EntityType.BRAND);
  };

  return (
    <div>
      {/* Brand selector */}
      <BrandSelector 
        onSelect={handleBrandSelected}
        onCreate={handleBrandCreated}
      />
      
      {/* Chat wrapper - starts without entity */}
      <ChatWrapper
        ref={chatRef}
        userMpAuthToken={process.env.AUTH_TOKEN}
        chatServerUrl={process.env.WS_URL}
        chatServerKey={process.env.SERVER_KEY}
        userId={currentUser.id}
        // No entityId or entityType initially
        config={{
          mode: 'sidebar',
          appName: 'My AI Assistant',
          description: 'Chat with our AI assistant',
        }}
      />
    </div>
  );
}
```

## Advanced Scenarios

### Changing Entity Type

You can also change the entity type if needed:

```typescript
// Switch from BRAND to ACCOUNT
chatRef.current?.updateEntityId(accountId, EntityType.ACCOUNT);
```

### Only Updating Entity ID (Keeping Same Type)

If you only need to update the ID but keep the same type:

```typescript
// Second parameter is optional
chatRef.current?.updateEntityId(newBrandId);
```

### Workflow: Empty Chat → Entity Association

```typescript
function ConversationalOnboarding() {
  const chatRef = useRef<ChatWrapperRef>(null);
  const [conversationStarted, setConversationStarted] = useState(false);

  // Start chat without entity
  useEffect(() => {
    setConversationStarted(true);
  }, []);

  // After some conversation, user creates brand
  const handleBrandSetup = async (brandData: BrandData) => {
    const newBrand = await createBrand(brandData);
    
    // Associate the ongoing conversation with the new brand
    chatRef.current?.updateEntityId(newBrand.id, EntityType.BRAND);
    
    // Optionally notify the chat
    console.log('Chat is now linked to your brand!');
  };

  return (
    <div>
      <ChatWrapper
        ref={chatRef}
        userMpAuthToken={token}
        chatServerUrl={wsUrl}
        chatServerKey={serverKey}
        userId={userId}
        // Start without entity - will be set later
        config={{
          mode: 'fullscreen',
          appName: 'Brand Setup Assistant',
          welcomeMessage: 'Let me help you set up your brand!',
        }}
      />
      
      {conversationStarted && (
        <BrandSetupForm onSubmit={handleBrandSetup} />
      )}
    </div>
  );
}
```

## Important Notes

1. **Thread Persistence**: When you update the `entityId`, it affects future ticket renewals and API calls, but does not retroactively change the `entityId` of messages already sent.

2. **Access Control**: The updated `entityId` and `entityType` will be used for access control on subsequent operations.

3. **WebSocket Connection**: The update happens immediately and doesn't require reconnecting the WebSocket. The new entity information will be used the next time a ticket is renewed.

4. **Error Handling**: If the chat client hasn't been initialized yet, the update will be silently ignored with a console warning.

5. **Thread Loading**: When `entityId` is provided, the chat will automatically load the conversation history for that entity using the flexible query-based loading system.

## API Reference

### ChatWrapperRef.updateEntityId

```typescript
updateEntityId(entityId: string, entityType?: EntityType): void
```

**Parameters:**
- `entityId` (required): The new entity ID to associate with the chat
- `entityType` (optional): The new entity type. Only needed if changing from one type to another

**Returns:** `void`

**Example:**
```typescript
chatRef.current?.updateEntityId('brand-123', EntityType.BRAND);
```

### Available Entity Types

```typescript
enum EntityType {
  BRAND = "BRAND",
  ACCOUNT = "ACCOUNT",
  USER = "USER",
}
```

## Testing

When testing components that use this feature:

```typescript
import { render } from '@testing-library/react';
import { ChatWrapperRef } from '@oddle/chat-wrapper';

test('updates entity ID when brand is selected', () => {
  const chatRef = React.createRef<ChatWrapperRef>();
  
  const { getByText } = render(
    <MyComponent chatRef={chatRef} />
  );
  
  // Mock the updateEntityId method
  const updateSpy = jest.spyOn(chatRef.current!, 'updateEntityId');
  
  // Trigger brand selection
  fireEvent.click(getByText('Select Brand'));
  
  expect(updateSpy).toHaveBeenCalledWith('brand-123', EntityType.BRAND);
});
```

## Troubleshooting

**Q: The update doesn't seem to work**
- Ensure the ref is properly attached to ChatWrapper
- Check that the chat client has been initialized (connection established)
- Verify console for any warning messages

**Q: Do I need to reconnect the WebSocket?**
- No, the WebSocket connection remains active. The entity information is updated in the TicketManager's auth data.

**Q: Can I update the entity multiple times?**
- Yes, you can call `updateEntityId` as many times as needed.

**Q: What happens to messages sent before the update?**
- Messages already sent retain their original entity association. Only new operations use the updated entity.
