import React, { type FC, type SVGProps } from 'react';

export type IconName =
  | 'info'
  | 'details'
  | 'other'
  | 'ending'
  | 'plus'
  | 'document'
  | 'rename'
  | 'copy'
  | 'duplicate'
  | 'options'
  | 'trash';

const ICON_SVGS: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  info: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  details: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
           M9 5a2 2 0 002 2h2a2 2 0 002-2
           M9 5a2 2 0 012-2h2a2 2 0 012 2
           m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  ),
  other: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414
           a1 1 0 00-.293-.707l-5.414-5.414
           A1 1 0 0014.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
  ending: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  plus: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  document: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6
           m2 5H7a2 2 0 01-2-2V5
           a2 2 0 012-2h5.586
           a1 1 0 01.707.293l5.414 5.414
           a1 1 0 01.293.707V19
           a2 2 0 01-2 2z"
      />
    </svg>
  ),
  rename: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536
           m-2.036-5.036a2.5 2.5 0 113.536 3.536
           L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  ),
  copy: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7v8a2 2 0 002 2h6
           M8 7V5a2 2 0 012-2h4.586
           a1 1 0 01.707.293l4.414 4.414
           a1 1 0 01.293.707V15a2 2 0 01-2 2h-2"
      />
    </svg>
  ),
  duplicate: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 8h10M7 12h10M7 16h10
           M9 21H5a2 2 0 01-2-2V5
           a2 2 0 012-2h4l2 2h4
           a2 2 0 012 2v1H7z"
      />
    </svg>
  ),
  trash: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142
           A2 2 0 0116.138 21H7.862
           a2 2 0 01-1.995-1.858L5 7
           m5 4v6m4-6v6
           m1-10V4a1 1 0 00-1-1h-4
           a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
  options: props => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01"/>
    </svg>
  ),
};

export const ICONS = Object.keys(ICON_SVGS) as IconName[];

export const Icon: FC<{ name: IconName } & SVGProps<SVGSVGElement>> = ({
  name,
  className,
  ...rest
}) => {
  const Comp = ICON_SVGS[name];
  return <Comp className={className} {...rest} />;
};
