import React, {Fragment} from 'react'
import {rgba} from 'polished'
import {Global, css} from '@emotion/react'

import colors from '~/lib/colors'
import {bpMinSM, bpMinLG} from '~/lib/breakpoints'
import Header from './Header'
import reset from '~/lib/reset'
import {fonts} from '~/lib/typography'

import config from '../config'
import Footer from '~/components/Footer'

const Layout: React.FC<{frontmatter?: any; noFooter?: boolean}> = ({
  frontmatter = {},
  children,
  noFooter = false,
}) => {
  return (
    <Fragment>
      <Global
        styles={css`
          :root {
            --color-black: ${colors.black};
            --color-white: ${colors.white};
            --color-pink: ${colors.pink};
            --color-gray: ${colors.gray};
            --color-primary: ${colors.primary};
            --color-body-color: ${false ? colors.white : colors.black};
            --color-body-bg: ${false ? colors.black : colors.white};
          }
          body {
            color: ${colors.black};
            background-color: ${colors.white};
            &.dark-mode {
              color: ${colors.white};
              background-color: ${colors.black};
            }
          }
          .dark-mode {
            .social-btn {
              color: ${colors.white};
              &:hover {
                color: ${colors.primary};
              }
            }
            .sa {
              stroke: ${colors.black};
            }
            .sb {
              stroke: ${colors.white};
            }
            .fa {
              fill: ${colors.black};
            }
            .fb {
              fill: ${colors.white};
            }
            caption {
              color: ${colors.black};
            }
            hr {
              border-top: 1px solid ${rgba(colors.white, 0.2)};
            }
            #open-search,
            #dark-mode-toggler {
              background: ${rgba(colors.white, 0.05)};
              color: ${colors.white};
            }
          }
          .sa {
            stroke: ${colors.white};
          }
          .sb {
            stroke: ${colors.black};
          }
          .fa {
            fill: ${colors.white};
          }
          .fb {
            fill: ${colors.black};
          }
          #open-search,
          #dark-mode-toggler {
            background: ${rgba(colors.black, 0.05)};
            color: ${colors.black};
            @media (hover: hover) {
              &:hover {
                color: ${colors.white};
                background: ${colors.primary};
              }
            }
          }
          ::selection {
            color: ${colors.white};
            background-color: ${colors.primary};
          }
          a {
            color: ${colors.primary};
            @media (hover: hover) {
              &:hover,
              &:focus {
                color: ${colors.primary};
              }
            }
          }
          blockquote {
            border-left: 5px solid ${colors.primary};
          }
          caption {
            color: ${colors.white};
          }
          h1 {
            font-size: 24px;
          }
          h2 {
            font-size: 22px;
          }
          ${bpMinSM} {
            h1 {
              font-size: 28px;
            }
            h2 {
              font-size: 26px;
            }
          }
          ${bpMinLG} {
            h1 {
              font-size: 30px;
            }
            h2 {
              font-size: 28px;
            }
          }
          hr {
            margin: 50px 0;
            border: none;
            border-top: 1px solid ${rgba(colors.black, 0.2)};
            background: none;
          }
          em {
            font-family: ${fonts.regularItalic};
          }
          strong {
            font-family: ${fonts.semibold};
            font-weight: normal;
            em {
              font-family: inherit;
            }
          }
          h1,
          h2,
          h3,
          h4 {
            a {
              color: inherit;
            }
          }
          input {
            border-radius: 4px;
            border: 1px solid ${colors.gray};
            padding: 5px 10px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
            font-family: ${fonts.regular};
            margin-top: 5px;
            ::placeholder {
              opacity: 0.4;
            }
          }
          .gatsby-resp-image-image {
            background: none !important;
            box-shadow: 0;
          }
          ${reset};
        `}
      />
      <div className="flex flex-col w-full min-h-screen">
        <Header siteTitle="Joel's Blog" />
        <Fragment>{children}</Fragment>
        {noFooter || <Footer author="Joel Hooks" />}
      </div>
    </Fragment>
  )
}

export default Layout
