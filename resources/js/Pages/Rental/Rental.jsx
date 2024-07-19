import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { indoDateFormat } from "@/Utils/date";
import { Head } from "@inertiajs/react";

export default function Rental({ auth, rentals }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Peminjaman
                </h2>
            }
        >
            <Head title="Peminjaman" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-center font-bold m-3">
                            <h1 className="text-2xl">Riwayat Peminjaman</h1>
                        </div>
                        <table className="w-full min-w-max table-auto text-center border">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <div className="font-normal leading-none ">
                                            Mobil
                                        </div>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <div className="font-normal leading-none ">
                                            Tanggal Sewa
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rentals?.length > 0 &&
                                    rentals?.map((rental, index) => {
                                        const isLast =
                                            index === rentals.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={rental?.id}>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {rental?.car?.detail}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {indoDateFormat(
                                                            rental?.rental_date
                                                        ) +
                                                            " - " +
                                                            indoDateFormat(
                                                                rental?.return_date
                                                            )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {rentals?.length === 0 && (
                            <div className="text-center m-3">Data Kosong</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
