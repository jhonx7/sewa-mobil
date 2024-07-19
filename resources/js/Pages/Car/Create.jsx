import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CreateCar({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        brand: "",
        model: "",
        license_plate: "",
        cost: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("car.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Mobil" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="m-4">
                                    <InputLabel htmlFor="brand" value="Merek" />

                                    <TextInput
                                        id="brand"
                                        name="brand"
                                        value={data.brand}
                                        className="mt-1 block w-full"
                                        autoComplete="brand"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("brand", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.brand}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="m-4">
                                    <InputLabel htmlFor="model" value="Model" />

                                    <TextInput
                                        id="model"
                                        name="model"
                                        value={data.model}
                                        className="mt-1 block w-full"
                                        autoComplete="model"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("model", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.brand}
                                        className="mt-2"
                                    />
                                </div>
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
                                            setData(
                                                "license_plate",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.license_plate}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="m-4">
                                    <InputLabel
                                        htmlFor="cost"
                                        value="Harga Sewa Perhari"
                                    />

                                    <TextInput
                                        id="cost"
                                        name="cost"
                                        value={data.cost}
                                        className="mt-1 block w-full"
                                        autoComplete="cost"
                                        type="number"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("cost", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.cost}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end m-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
