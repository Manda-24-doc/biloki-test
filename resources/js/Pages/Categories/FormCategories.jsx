import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const defaultValues = {
    name: '',
    description: '',
    image: null,
};

export default function FormCategories({
    initialValues = {},
    mode = 'create',
    onSuccess,
    onCancel,
}) {
    const { id: initialId, image: initialImage, ...formValues } = initialValues;

    const { data, setData, post, put, errors, processing, reset } = useForm({
        ...defaultValues,
        ...formValues,
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(
        initialImage ? `/storage/${initialImage}` : '',
    );

    useEffect(() => {
        if (data.image instanceof File) {
            const previewUrl = URL.createObjectURL(data.image);

            setImagePreview(previewUrl);

            return () => URL.revokeObjectURL(previewUrl);
        }

        if (!data.image) {
            setImagePreview(initialImage ? `/storage/${initialImage}` : '');
        }
    }, [data.image, initialImage]);

    const submit = (event) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                reset();

                if (onSuccess) {
                    onSuccess();
                }
            },
        };

        if (mode === 'edit' && initialId) {
            put(route('categories.update', initialId), options);
            return;
        }

        post(route('categories.store'), options);
    };

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                    {mode === 'edit' ? 'Update category' : 'Create category'}
                </h3>
                <p className="text-sm text-gray-500">
                    {mode === 'edit'
                        ? 'Edit the selected category and save your changes.'
                        : 'Fill the form to add a new category.'}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5 px-6 py-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(event) => setData('name', event.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div className='grid grid-cols-2 gap-4'>


                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(event) =>
                                setData('description', event.target.value)
                            }
                            rows="4"
                            className="resize-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <InputError className="mt-2" message={errors.description} />
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                        <InputLabel htmlFor="image" value="Category image" />
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="mt-2 block w-full cursor-pointer rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-gray-400"
                            onChange={(event) =>
                                setData('image', event.target.files?.[0] ?? null)
                            }
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            Upload a JPG, PNG or WEBP image.
                        </p>
                        {imagePreview && (
                            <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
                                <img
                                    src={imagePreview}
                                    alt={data.name || 'Category image'}
                                    className="h-16 w-16 rounded-lg object-cover"
                                />
                                <div className="text-sm text-gray-600">
                                    <p className="font-medium text-gray-900">
                                        {data.image ? 'Selected image' : 'Current image'}
                                    </p>
                                    <p className="break-all text-xs">
                                        {data.image?.name || initialImage || 'No image selected'}
                                    </p>
                                </div>
                            </div>
                        )}
                        <InputError className="mt-2" message={errors.image} />
                    </div>
                </div>



                <div className="flex items-center justify-end gap-3 border-t pt-4">
                    {onCancel && (
                        <SecondaryButton type="button" onClick={onCancel}>
                            Back to list
                        </SecondaryButton>
                    )}

                    <PrimaryButton disabled={processing}>
                        {mode === 'edit' ? 'Update category' : 'Save category'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
