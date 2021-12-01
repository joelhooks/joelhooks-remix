/** @jsx jsx */
import React from 'react'
import {css, jsx} from '@emotion/react'
import {bpMinSM, bpMinMD, bpMinLG, bpMinXL} from '~/lib/breakpoints'
import Container from './Container'
import Logo from './Logo'

import colors from '~/lib/colors'

const Header = ({siteTitle}) => {
  return (
    <header className="w-full flex-shrink-0 py-4 md:py-8 lg:py-12 bg-body">
      <Container noVerticalPadding>
        <nav className="w-full flex justify-between items-center">
          <a
            href="/"
            css={css({
              '@media (hover: hover)': {
                ':hover': {
                  color: colors.primary,
                },
              },
              [bpMinXL]: {
                transform: 'translate(-70px, 0)',
              },
            })}
          >
            <Logo
              css={css({
                width: '80px',
                height: '66px',
                [bpMinSM]: {
                  width: '100px',
                  height: '82px',
                },
                [bpMinMD]: {
                  width: '120px',
                  height: '99px',
                },
                [bpMinLG]: {
                  width: '140px',
                  height: '115px',
                },
              })}
            />
            <span
              css={css({
                margin: '20px 0 0 15px',
                [bpMinSM]: {
                  margin: '40px 0 0 15px',
                },
                [bpMinMD]: {
                  margin: '50px 0 0 20px',
                },
                [bpMinLG]: {
                  margin: '60px 0 0 20px',
                },
              })}
            >
              your friend Joel's digital garden
            </span>
          </a>
          <div
            css={{
              display: 'flex',
              marginTop: '20px',
              [bpMinSM]: {
                marginTop: '20px',
              },
              [bpMinMD]: {
                marginTop: '30px',
              },
              [bpMinLG]: {
                margin: '40px 0 0 20px',
              },
            }}
          ></div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
