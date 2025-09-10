/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { APPEARANCE } from '@/lib/presets/agents';

interface PortraitProps {
  appearance: APPEARANCE;
  color: string;
  size?: number;
}

// Simple, stylized SVG portraits for different agent appearances.

const DefaultFace = ({ color }: { color: string }) => (
  <>
    <circle cx="25" cy="25" r="25" fill={color} />
    <circle cx="18" cy="20" r="2" fill="black" />
    <circle cx="32" cy="20" r="2" fill="black" />
    <path
      d="M 18 32 C 22 38, 28 38, 32 32"
      stroke="black"
      strokeWidth="1.5"
      fill="transparent"
    />
  </>
);

const GlassesFace = ({ color }: { color: string }) => (
  <>
    <DefaultFace color={color} />
    <circle cx="18" cy="20" r="5" stroke="black" strokeWidth="1" fill="none" />
    <circle cx="32" cy="20" r="5" stroke="black" strokeWidth="1" fill="none" />
    <line x1="23" y1="20" x2="27" y2="20" stroke="black" strokeWidth="1" />
  </>
);

const WinkFace = ({ color }: { color: string }) => (
  <>
    <circle cx="25" cy="25" r="25" fill={color} />
    <circle cx="18" cy="20" r="2" fill="black" />
    <path
      d="M 29 20 L 35 20"
      stroke="black"
      strokeWidth="1.5"
      fill="transparent"
    />
    <path
      d="M 18 32 C 22 38, 28 38, 32 32"
      stroke="black"
      strokeWidth="1.5"
      fill="transparent"
    />
  </>
);

const CyclopsFace = ({ color }: { color: string }) => (
  <>
    <circle cx="25" cy="25" r="25" fill={color} />
    <circle cx="25" cy="20" r="4" fill="black" />
    <path
      d="M 18 32 C 22 38, 28 38, 32 32"
      stroke="black"
      strokeWidth="1.5"
      fill="transparent"
    />
  </>
);

export default function Portrait({
  appearance,
  color,
  size = 50,
}: PortraitProps) {
  const renderFace = () => {
    switch (appearance) {
      case 'glasses':
        return <GlassesFace color={color} />;
      case 'wink':
        return <WinkFace color={color} />;
      case 'cyclops':
        return <CyclopsFace color={color} />;
      case 'default':
      default:
        return <DefaultFace color={color} />;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className="agent-portrait"
    >
      {renderFace()}
    </svg>
  );
}