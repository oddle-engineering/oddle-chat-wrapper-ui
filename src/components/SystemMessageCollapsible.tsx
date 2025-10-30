import React, { useState } from "react";
import { Message } from "../types";

interface SystemMessageCollapsibleProps {
  message: Message;
}

export const SystemMessageCollapsible: React.FC<SystemMessageCollapsibleProps> = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getMessageLabel = () => {
    if (message.role === "system") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="chat-wrapper__thinking-icon">
            <svg
              width="20"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_64_36257"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="17"
              >
                <rect y="0.381836" width="16" height="16" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_64_36257)">
                <path
                  d="M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z"
                  fill="#637381"
                />
              </g>
            </svg>
          </div>
          <span>AI text input &lt;show-toolname&gt;...</span>
        </div>
      );
    }
    return <span>System Message</span>;
  };

  return (
    <div className="chat-wrapper__system-message">
      <div
        className="chat-wrapper__system-message-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
      >
        {getMessageLabel()}
        <div className="chat-wrapper__thinking-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            <mask
              id="mask0_44_18068"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="16"
              height="17"
            >
              <rect y="0.000488281" width="16" height="16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_44_18068)">
              <path
                d="M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z"
                fill="#637381"
              />
            </g>
          </svg>
        </div>
      </div>
      {isExpanded && (
        <div className="chat-wrapper__system-message-content">
          <span>{message.content}</span>
        </div>
      )}
    </div>
  );
};