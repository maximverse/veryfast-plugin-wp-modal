import styled from "@emotion/styled";
import ChevronDown from "./ChevronDown";
import "./styles.css";
import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";

const CountrySelect = (props) => {
  return (
    <Container>
      <Content>
        <SelectContainer>
          <Option value="md">Moldova</Option>
          <Option value="ro">Romania</Option>
          <Option value="us">United States</Option>
          <Option value="ng">Nigeria</Option>
        </SelectContainer>
      </Content>
    </Container>
  );
};

const Option = styled.option`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 14px;
  gap: 8px;

  width: 320px;
  height: 44px;

  /* Base/White */

  background: #ffffff;
  /* Gray/300 */

  border: 1px solid #d0d5dd;
  /* Shadow/xs */

  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const Input2 = styled.input`
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #fff;
  border-width: 1px;
  border-color: #d0d5dd;
  border-style: solid;
  box-shadow: 0px 1px 2px 0 rgba(16, 24, 40, 0.05);
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 320px;
  height: fit-content;
  gap: 6px;
`;

const SelectContainer = styled.select`
  color: #444;
  font-family: Inter;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  gap: 8px;
  padding: 10px 2px;
  border-radius: 8px;
  background: #fff;
  border-width: 1px;
  border-color: #d0d5dd;
  border-style: solid;
  box-shadow: 0px 1px 2px 0 rgba(16, 24, 40, 0.05);
  border: 0;

  &:active {
    border: 0;
    outline: 0;
  }

  &:focus {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    gap: 8px;
    padding: 10px 2px;
    border-radius: 8px;
    background: #fff;
    border-width: 1px;
    border-color: #d0d5dd;
    border-style: solid;
    box-shadow: 0px 1px 2px 0 rgba(16, 24, 40, 0.05);
    outline: 0;
    border: 0;
    color: #444;
  }
`;

const Content = styled.div`
  color: #444;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  flex-basis: 100%;
  position: relative;
  gap: 8px;
`;

const Text = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Inter;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: left;
  color: #444;
`;

export default CountrySelect;
