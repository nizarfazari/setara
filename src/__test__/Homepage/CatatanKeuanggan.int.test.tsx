import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { CatatanKeuangan } from "../../components/Homepage/CatatanKeuangan";
import axios from "axios";
import { DATA_MONTH } from "../../utils/constant";
import { useAuth } from "../../hooks/useAuth";

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth');

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CatatanKeuangan Component", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    (useAuth as jest.Mock).mockReturnValue({
      user: { token: "test-token" },
    });
  });

  it("renders loading state initially", () => {
    render(<CatatanKeuangan />);

    // Check if skeleton loaders are displayed
    expect(screen.getAllByRole("progressbar")).toHaveLength(3);
  });

  it("fetches and displays the monthly report", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          income: 5000,
          expense: 3000,
          total: 2000,
        },
      },
    });

    render(<CatatanKeuangan />);

    await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());

    expect(screen.getByLabelText(/Total pemasukan bulan ini/i)).toHaveTextContent("Rp5.000");
    expect(screen.getByLabelText(/Total pengeluaran bulan ini/i)).toHaveTextContent("Rp3.000");
    expect(screen.getByLabelText(/Selisih bulan ini/i)).toHaveTextContent("Rp2.000");
  });

  it("handles month change", async () => {
    render(<CatatanKeuangan />);


    fireEvent.click(screen.getByText(DATA_MONTH[0].month));


    fireEvent.click(screen.getByText(DATA_MONTH[1].month));


    expect(screen.getByText(DATA_MONTH[1].month)).toBeInTheDocument();
  });

  it("handles year change", async () => {
    render(<CatatanKeuangan />);

    const yearPicker = screen.getByPlaceholderText(/Pilih Tahun/i);
    fireEvent.mouseDown(yearPicker);
    fireEvent.click(screen.getByText("2023"));

    expect(screen.getByLabelText(/Pilih tahun/i)).toHaveTextContent("2023");
  });

  it("filters transactions on filter button click", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          income: 5000,
          expense: 3000,
          total: 2000,
        },
      },
    });

    render(<CatatanKeuangan />);

    await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());

    fireEvent.click(screen.getByRole("button", { name: /Filter/i }));

    expect(screen.getByLabelText(/Total pemasukan bulan ini/i)).toHaveTextContent("Rp5.000");
    expect(screen.getByLabelText(/Total pengeluaran bulan ini/i)).toHaveTextContent("Rp3.000");
    expect(screen.getByLabelText(/Selisih bulan ini/i)).toHaveTextContent("Rp2.000");
  });
});
