import React from 'react'

const URL_REGEX = /^(https?:\/\/[^\s<]+[^\s<.,;:!?)}\]])/

export function linkify(text: string): React.ReactNode {
  const parts = text.split(/(https?:\/\/[^\s<]+[^\s<.,;:!?)}\]])/g)
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      return React.createElement('a', {
        key: i,
        href: part,
        target: '_blank',
        rel: 'noreferrer noopener',
        className: 'text-blue hover:underline break-all',
      }, part)
    }
    return part
  })
}
