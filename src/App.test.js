import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import caseStudiesReducer from './features/caseStudies/caseStudiesSlice';
import whyChooseUsReducer from './features/whyChooseUs/whyChooseUsSlice';
import WhyChooseUs from './components/whyChooseUs/WhyChooseUs';
import CaseStudies from './components/caseStudies/CaseStudies';

jest.mock('./features/caseStudies/caseStudiesApi', () => ({
  // Plain function (not jest.fn) because CRA's resetMocks would wipe the implementation.
  fetchCaseStudies: () =>
    Promise.resolve([
      { id: '1', title: 'Telehealth Portal', category: 'Web', summary: 'Clinic bookings', year: 2024 },
      { id: '2', title: 'Fitness App', category: 'Mobile', summary: 'Workout plans', year: 2023 },
    ]),
}));

const renderWithStore = (ui) => {
  const store = configureStore({
    reducer: { caseStudies: caseStudiesReducer, whyChooseUs: whyChooseUsReducer },
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

test('Why Choose Us renders four feature cards and toggles the active card', () => {
  renderWithStore(<WhyChooseUs />);
  expect(screen.getByText(/why companies/i)).toBeInTheDocument();

  const cards = screen.getAllByRole('button', { pressed: false });
  expect(cards).toHaveLength(4);

  fireEvent.click(screen.getByRole('button', { name: /fast delivery/i }));
  expect(screen.getByRole('button', { name: /fast delivery/i })).toHaveAttribute('aria-pressed', 'true');
});

test('Case Studies shows a skeleton, then cards, and filters by category', async () => {
  renderWithStore(<CaseStudies />);
  expect(screen.getByRole('status', { name: /loading case studies/i })).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('Telehealth Portal')).toBeInTheDocument());
  expect(screen.getByText('Fitness App')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Mobile' }));
  expect(screen.queryByText('Telehealth Portal')).not.toBeInTheDocument();
  expect(screen.getByText('Fitness App')).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/search by title/i), { target: { value: 'nothing here' } });
  expect(screen.getByText(/no case studies match/i)).toBeInTheDocument();
});
