import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatRupiah } from "@/Utils/currency";
import { indoDateFormat } from "@/Utils/date";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Payment({ auth, payments }) {
    const [openModal, SetOpenModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        license_plate: "",
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("payment.store"), {
            onSuccess: () => {
                handleClose();
            },
        });
    };
    const handleOpen = () => {
        SetOpenModal(true);
    };
    const handleClose = () => {
        SetOpenModal(false);

        reset();
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengembalian
                </h2>
            }
        >
            <Head title="Pengembalian" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-end m-4">
                            <DangerButton onClick={handleOpen}>
                                Pengembalian
                            </DangerButton>
                        </div>
                        <div className="text-center font-bold m-3">
                            <h1 className="text-2xl">Riwayat Pengembalian</h1>
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
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <div className="font-normal leading-none ">
                                            Tanggal Pengembalian
                                        </div>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <div className="font-normal leading-none ">
                                            Total Hari
                                        </div>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <div className="font-normal leading-none ">
                                            Total Biaya
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments?.length > 0 &&
                                    payments?.map((payment, index) => {
                                        const isLast =
                                            index === payments.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={payment?.id}>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {
                                                            payment?.rental?.car
                                                                ?.detail
                                                        }
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {indoDateFormat(
                                                            payment?.rental
                                                                ?.rental_date
                                                        ) +
                                                            " - " +
                                                            indoDateFormat(
                                                                payment?.rental
                                                                    ?.return_date
                                                            )}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {indoDateFormat(
                                                            payment?.payment_date
                                                        )}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {payment?.total_day}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="font-normal">
                                                        {formatRupiah(
                                                            payment?.amount
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {payments?.length === 0 && (
                            <div className="text-center m-3">Data Kosong</div>
                        )}
                    </div>
                </div>
            </div>

            <Modal show={openModal} onClose={handleClose}>
                <form onSubmit={submit}>
                    <div className="m-4">
                        <InputLabel
                            htmlFor="license_plate"
                            value="Nomor Plat"
                        />

                        <TextInput
                            id="license_plate"
                            name="license_plate"
                            value={data.license_plate}
                            className="mt-1 block w-full"
                            autoComplete="license_plate"
                            isFocused={true}
                            onChange={(e) =>
                                setData("license_plate", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.license_plate}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end m-4">
                        <DangerButton
                            onClick={handleClose}
                            type="button"
                            className="ms-4"
                            disabled={processing}
                        >
                            Batal
                        </DangerButton>
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Kembalikan
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
