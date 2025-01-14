import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, typography } from './shared/styles';

const Label = styled.span``;

const ErrorMessage = styled.span`
  color: ${color.negative};
  font-weight: ${typography.weight.regular};
  &:not(:only-child) {
    margin-left: 0.5em;
  }
`;

const LabelWrapper = styled.div`
  margin-bottom: ${props => (props.appearance === 'code' ? 0.5 : 0.33)}em;
  font-weight: ${props => props.appearance !== 'code' && typography.weight.extrabold};
  font-family: ${props => props.appearance === 'code' && typography.type.code};
  font-size: ${props => (props.appearance === 'code' ? typography.size.s1 : typography.size.s2)}px;
`;

const Subtext = styled.div``;

const TextareaText = styled.textarea`
  ::placeholder: ${color.medium};
  appearance: none;
  border: none;
  box-sizing: border-box;
  display: block;
  outline: none;
  width: 100%;
  word-wrap: break-word;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 3em ${color.lightest} inset;
  }
`;

const TextareaWrapper = styled.div`
  display: inline-block;
  font-family: ${props => props.appearance === 'code' && typography.type.code};
  font-size: ${props => (props.appearance === 'code' ? typography.size.s1 : typography.size.s2)}px;
  overflow: hidden;
  position: relative;
  vertical-align: top;
  width: 100%;

  ${TextareaText} {
    background: ${color.lightest};
    border-radius: 0;
    color: ${color.darkest};
    font-size: ${typography.size.s2}px;
    line-height: 20px;
    padding: .7111em 1em; //40

    &:focus { box-shadow: ${color.primary} 0 0 0 1px inset; }

    ${props =>
      props.appearance === 'secondary' &&
      css`
        box-shadow: ${color.mediumlight} 0 0 0 1px inset;

        &:focus {
          box-shadow: ${color.primary} 0 0 0 1px inset;
        }
      `}

    ${props =>
      props.appearance === 'tertiary' &&
      css`
        padding: 0;
        border: none;
        box-shadow: none;
        background: none;

        &:focus {
          box-shadow: none !important;
        }
      `}

    ${props =>
      props.appearance === 'code' &&
      css`
        font-size: ${typography.size.s1}px;
        line-height: 16px;
        font-family: ${typography.type.code};
        border-radius: 2px;
        background: ${color.border};
        padding: 6px 6px;
      `}
  }

  ${props =>
    props.error &&
    css`
      ${props.appearance !== 'tertiary' &&
        css`
          ${TextareaText} {
            box-shadow: ${color.negative} 0 0 0 1px inset;
            &:focus {
              box-shadow: ${color.negative} 0 0 0 1px inset !important;
            }
          }
        `};
    `}

`;

const TextareaContainer = styled.div`
  ${props =>
    props.orientation === 'horizontal' &&
    css`
      display: table-row;

      ${LabelWrapper}, ${TextareaWrapper} {
        display: table-cell;
      }

      ${LabelWrapper} {
        width: 1px;
        padding-right: 20px;
      }

      ${TextareaWrapper} {
        width: auto;
      }
    `}
`;

export function Textarea({
  value,
  label,
  error,
  subtext,
  subtextSentiment,
  appearance,
  orientation,
  className,
  ...other
}) {
  return (
    <TextareaContainer orientation={orientation} className={className}>
      {(label || error) && (
        <LabelWrapper appearance={appearance}>
          {label && <Label>{label}</Label>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LabelWrapper>
      )}
      <TextareaWrapper error={error} appearance={appearance}>
        <TextareaText value={value} rows="7" {...other} />
        {subtext && <Subtext sentiment={subtextSentiment}>{subtext}</Subtext>}
      </TextareaWrapper>
    </TextareaContainer>
  );
}

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  appearance: PropTypes.oneOf(['default', 'secondary', 'tertiary', 'code']),
  label: PropTypes.string,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  error: PropTypes.string,
  subtext: PropTypes.string,
  subtextSentiment: PropTypes.oneOf(['default', 'negative', 'warning']),
  className: PropTypes.string,
};

Textarea.defaultProps = {
  appearance: 'default',
  label: null,
  orientation: 'vertical',
  error: null,
  subtext: null,
  subtextSentiment: 'default',
  className: null,
};
