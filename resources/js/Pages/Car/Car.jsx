import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { formatRupiah } from "@/Utils/currency";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Car({ auth, data }) {
    const [openModal, SetOpenModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        rental_date: "",
        return_date: "",
        car_id: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("rental.store"), {
            onSuccess: () => {
                reset();
                SetOpenModal(false);
            },
        });
    };

    const handleClickSewa = (car) => {
        setData("car_id", car?.id);
        setSelected(car);
        SetOpenModal(true);
    };
    const handleClose = () => {
        SetOpenModal(false);

        setSelected(null);
        reset();
    };
    const handleSearch = (e) => {
        let query = { search: e.target.value };

        router.get(route(route().current()), query, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between">
                                <TextInput
                                    className="w-1/4"
                                    name="search"
                                    placeholder="Cari Mobil"
                                    onChange={handleSearch}
                                />
                                <DangerButton
                                    onClick={() =>
                                        router.get(route("car.create"))
                                    }
                                >
                                    Tambah
                                </DangerButton>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                {data?.length > 0 &&
                                    data?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="m-2 p-4 bg-white overflow-hidden shadow-lg sm:rounded-lg"
                                        >
                                            <img src="/no-image.jpg" />
                                            <p className=" text-lg font-semibold">
                                                {item?.brand}
                                            </p>
                                            <p>{item?.model}</p>

                                            <p className=" font-light text italic">
                                                {item?.license_plate}
                                            </p>

                                            <p>
                                                {formatRupiah(item?.cost)} /
                                                Hari
                                            </p>
                                            <div className="flex justify-end mt-3">
                                                <PrimaryButton
                                                    onClick={() =>
                                                        handleClickSewa(item)
                                                    }
                                                >
                                                    Sewa
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={openModal}>
                <div className="m-4 text-lg font-semibold">
                    {selected?.brand +
                        " " +
                        selected?.model +
                        " " +
                        selected?.license_plate}
                </div>
                <form onSubmit={submit}>
                    <div className="m-4">
                        <InputLabel
                            htmlFor="rental_date"
                            value="Tanggal Mulai"
                        />

                        <TextInput
                            id="rental_date"
                            name="rental_date"
                            value={formData.rental_date}
                            className="mt-1 block w-full"
                            autoComplete="rental_date"
                            type="date"
                            isFocused={true}
                            onChange={(e) =>
                                setData("rental_date", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.rental_date}
                            className="mt-2"
                        />
                    </div>
                    <div className="m-4">
                        <InputLabel
                            htmlFor="return_date"
                            value="Tanggal Selesai"
                        />

                        <TextInput
                            id="return_date"
                            name="return_date"
                            value={formData.return_date}
                            className="mt-1 block w-full"
                            autoComplete="return_date"
                            type="date"
                            isFocused={true}
                            onChange={(e) =>
                                setData("return_date", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.return_date}
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
                            Sewa
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
