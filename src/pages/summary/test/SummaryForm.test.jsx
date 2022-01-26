import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event'

test('Initial checks', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
  const button = screen.getByRole('button', {name: /confirm order/i})

  expect(checkbox).not.toBeChecked()
  expect(button).toBeDisabled()
});

test('Button enabled on check', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
  const button = screen.getByRole('button', {name: /confirm order/i})

  userEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  expect(button).toBeEnabled()
})

test('popover responds to hover', async () => {
  render(<SummaryForm />)

  //Popover doesn't have any role.
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument()

  //popover appears on mouseover
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)

  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  //unhover userEvent

  userEvent.unhover(termsAndConditions)
  await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i))

})
