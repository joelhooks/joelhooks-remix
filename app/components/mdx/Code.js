import React from 'react'
import theme from 'prism-react-renderer/themes/oceanicNext'
import Highlight, {defaultProps} from 'prism-react-renderer'

const Code = ({codeString, language, ...props}) => {
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre
          className={`${className} no-whitespace-normalization`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default Code
