import React, { useCallback, useEffect, useRef } from 'react';
import { List, useDynamicRowHeight } from 'react-window';
import { Message } from '../types';
import { MessageItem } from './MessageItem';

interface VirtualizedMessageListProps {
  messages: Message[];
  height: number;
  className?: string;
}

// Individual message item component for virtualization
const VirtualizedMessageItem = React.memo<{
  index: number;
  style: React.CSSProperties;
  messages: Message[];
  setRowHeight: (index: number, height: number) => void;
}>(({ index, style, messages, setRowHeight }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const message = messages[index];

  // Measure item height after render
  useEffect(() => {
    if (itemRef.current) {
      const height = itemRef.current.getBoundingClientRect().height;
      setRowHeight(index, height);
    }
  }, [index, setRowHeight, message?.content, message?.isStreaming]);

  if (!message) {
    return <div style={style} />;
  }

  return (
    <div style={style}>
      <div ref={itemRef} style={{ padding: '8px 16px' }}>
        <MessageItem message={message} />
      </div>
    </div>
  );
});

VirtualizedMessageItem.displayName = 'VirtualizedMessageItem';

export const VirtualizedMessageList: React.FC<VirtualizedMessageListProps> = ({
  messages,
  height,
  className,
}) => {
  const listRef = useRef<any>(null);
  
  // Use dynamic row height from react-window
  const dynamicRowHeight = useDynamicRowHeight({
    defaultRowHeight: 80,
    key: 'messages'
  });

  const prevMessagesLength = useRef(messages.length);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const hasNewMessages = messages.length > prevMessagesLength.current;
    
    if (hasNewMessages && listRef.current) {
      // Scroll to the last message
      listRef.current.scrollToRow({
        index: messages.length - 1,
        align: 'end',
      });
    }
    
    prevMessagesLength.current = messages.length;
  }, [messages.length]);

  // Create row component
  const rowComponent = useCallback((props: any) => {
    return (
      <VirtualizedMessageItem
        {...props}
        messages={messages}
        setRowHeight={dynamicRowHeight.setRowHeight}
      />
    );
  }, [messages, dynamicRowHeight.setRowHeight]);

  return (
    <div className={className} style={{ height }}>
      <List
        listRef={listRef}
        defaultHeight={height}
        rowCount={messages.length}
        rowHeight={dynamicRowHeight}
        overscanCount={5}
        rowComponent={rowComponent}
        rowProps={{}}
        style={{
          height,
          direction: 'ltr',
        }}
      />
    </div>
  );
};

VirtualizedMessageList.displayName = 'VirtualizedMessageList';