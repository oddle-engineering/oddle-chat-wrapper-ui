# DevSettings and ThreadAttachmentModal Update

## Summary

Updated `DevSettings.tsx` and `ThreadAttachmentModal.tsx` to properly separate entity ownership updates from metadata updates, following the new architecture where:

- **Entity updates** (rare) - Change who owns the conversation
- **Metadata updates** (common) - Update dynamic business context

## Changes Made

### 1. DevSettings Component (`src/components/DevSettings.tsx`)

#### Updated Imports
```typescript
import { updateThread, updateThreadMetadata } from '../utils/threadApi';
```

#### Refactored `handleThreadAttachment` Function
**Before:** Single call to `updateThread` with all fields mixed together

**After:** Separated logic:
1. Updates entity ownership if `entityId` and `entityType` provided
2. Updates metadata/tag if provided
3. Makes sequential API calls for clarity

```typescript
// First, update entity if provided (rare - changing ownership)
if (hasEntityUpdate) {
  await updateThread(apiUrl, providerResId, {
    entityId: tempEntityId,
    entityType: tempEntityType,
  }, authOptions);
}

// Then, update metadata/tag if provided (common - business context)
if (hasMetadataUpdate) {
  await updateThreadMetadata(apiUrl, providerResId, {
    tag: tempTag || undefined,
    metadata: parsedMetadata,
  }, authOptions);
}
```

#### Improved UI Structure
Added visual sections to clarify the distinction:

- **Entity Ownership Section** (Rare)
  - Entity ID input
  - Entity Type dropdown
  - Clear description: "Use this to change which entity owns the conversation"

- **Separator** (Visual divider)

- **Business Context Section** (Common)
  - Tag input
  - Metadata JSON textarea
  - Clear description: "Use this to update dynamic data like order IDs, table IDs, status, etc."

### 2. ThreadAttachmentModal Component (`showcase/src/components/ThreadAttachmentModal.tsx`)

#### Updated Imports
```typescript
import { updateThread, updateThreadMetadata } from "@oddle/chat-wrapper-ui";
```

#### Refactored `handleThreadAttachment` Function
Identical separation logic as DevSettings for consistency.

#### Improved UI Structure
Same visual separation as DevSettings:
- Entity Ownership Section (Rare)
- Separator
- Business Context Section (Common)

## Benefits

### 1. **Clear Separation of Concerns**
```typescript
// Entity ownership (rare)
updateThread(apiUrl, providerResId, {
  entityId: 'brand_123',
  entityType: 'BRAND'
});

// Business context (common)
updateThreadMetadata(apiUrl, providerResId, {
  metadata: { orderId: 'order_789', tableId: 'table_5' }
});
```

### 2. **Better User Experience**
- Visual sections help users understand what each field does
- Clear labels distinguish between rare and common operations
- Better placeholder examples (e.g., `orderId`, `tableId` instead of generic `priority`)

### 3. **Improved Code Quality**
- Uses dedicated methods for each purpose
- More maintainable and testable
- Follows single responsibility principle

### 4. **Type Safety**
- Each method has focused parameters
- Clearer intent in code reviews

## Usage Examples

### Example 1: Only Update Metadata (Common Case)

```typescript
// User doesn't need to touch entity fields
// Just update business context
Tag: "high-priority"
Metadata: {"orderId": "ORD-123", "tableId": "5", "status": "pending"}
```

Result: Only `updateThreadMetadata` is called

### Example 2: Only Update Entity (Rare Case)

```typescript
// Transfer conversation ownership
Entity ID: brand_new_restaurant
Entity Type: BRAND
```

Result: Only `updateThread` is called

### Example 3: Update Both (Initial Setup)

```typescript
// First conversation for a new brand, set everything
Entity ID: brand_456
Entity Type: BRAND
Tag: "onboarding"
Metadata: {"source": "marketing", "campaign": "spring-sale"}
```

Result: Both `updateThread` and `updateThreadMetadata` are called sequentially

## Migration Notes

### Before
```typescript
// Old approach - everything mixed
await updateThread(apiUrl, providerResId, {
  entityId: 'brand_123',
  entityType: 'BRAND',
  tag: 'support',
  metadata: { orderId: '456' }
});
```

### After
```typescript
// New approach - separated by purpose
await updateThread(apiUrl, providerResId, {
  entityId: 'brand_123',
  entityType: 'BRAND'
});

await updateThreadMetadata(apiUrl, providerResId, {
  tag: 'support',
  metadata: { orderId: '456' }
});
```

## UI Improvements

### DevSettings UI Structure
```
┌─────────────────────────────────┐
│ Entity Ownership (Rare)         │
│ ─────────────────────────────── │
│ [ Entity ID input ]             │
│ [ Entity Type dropdown ]        │
└─────────────────────────────────┘

─────────────────────────────────

┌─────────────────────────────────┐
│ Business Context (Common)       │
│ ─────────────────────────────── │
│ [ Tag input ]                   │
│ [ Metadata JSON textarea ]      │
└─────────────────────────────────┘
```

### Visual Indicators
- Section headers with (Rare) and (Common) labels
- Helper text explaining when to use each section
- Better placeholder examples showing real use cases

## Testing Checklist

- [ ] Entity-only update works correctly
- [ ] Metadata-only update works correctly
- [ ] Combined update calls both APIs in sequence
- [ ] Empty form shows validation error
- [ ] Invalid JSON in metadata shows error
- [ ] Success message displays after update
- [ ] Form clears after successful update

## Related Files

- `src/components/DevSettings.tsx` - Main changes
- `showcase/src/components/ThreadAttachmentModal.tsx` - Showcase changes
- `src/utils/threadApi.ts` - New `updateThreadMetadata` function
- `ENTITY_METADATA_SEPARATION.md` - Architecture documentation
