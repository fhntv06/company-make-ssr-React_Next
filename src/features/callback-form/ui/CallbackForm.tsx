'use client';

import { Button, FileInput, Input, Link, PhoneInput, Textarea } from '@/shared/ui';
import { FieldValues, useForm, Controller } from 'react-hook-form';
import clsx from 'clsx';
import { nameRegex, textRegex, phoneRegex, emailRegex } from '@/shared/lib/validate';

interface Props {
  className?: string;
}

interface FormState extends FieldValues {
  task: string;
  file: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  additionalText: string;
}

export default function CallbackForm({ className }: Props) {
  const {
    register,
    formState: { errors, touchedFields },
    control,
    watch,
    setError,
    setValue,
    handleSubmit,
    reset,
  } = useForm<FormState>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      task: '',
      file: '',
      name: '',
      company: '',
      phone: '',
      email: '',
      additionalText: '',
    },
  });

  const submit = (formData: FormState) => {
    const data = {
      task: formData.task,
      file: formData.file,
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      email: formData.email,
      additionalText: formData.additionalText,
    };
    setTimeout(() => {
      const status = Math.floor(Math.random() * 2);

      if (status === 1) {
        alert('Успешно отправлено!'); // eslint-disable-line no-alert
        reset();
      } else {
        alert('Произошла ошибка'); // eslint-disable-line no-alert
      }

      console.log(data);
    }, 500);
  };

  return (
    <div className={clsx(className)}>
      <div className='mb-i80 grid grid-cols-4 gap-x-gap lg:grid-cols-6'>
        <h3 className='col-span-full mb-i64 font-medium lg:col-span-2 lg:mb-0'>опишите задачу</h3>
        <div className='col-span-4'>
          <Textarea
            label='в свободной форме'
            name='task'
            register={register}
            watch={watch}
            error={errors.task}
            required={'Пожалуйста, введите текст'}
            touched={touchedFields.task}
            pattern={{ value: textRegex, message: 'Некорректный формат' }}
          />
          <Controller
            name={'file'}
            control={control}
            render={() => (
              <FileInput
                className='mt-i32 lg:mt-i24'
                value={watch('file')}
                name='file'
                setError={setError}
                setValue={setValue}
                error={errors.file}
              />
            )}
          />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-x-gap border-t border-white/16 pt-[calc(theme(spacing.i16)+theme(spacing.i16))] lg:grid-cols-6'>
        <h3 className='col-span-full mb-i64 font-medium lg:col-span-2 lg:mb-0'>контакты</h3>
        <div className='col-span-4'>
          <div className='mb-i48 flex flex-col gap-x-gap lg:flex-row'>
            <Input
              className='mb-i48 lg:mb-0 lg:basis-1/2'
              label='имя'
              name='name'
              register={register}
              watch={watch}
              error={errors.name}
              required={'Пожалуйста, введите имя'}
              touched={touchedFields.name}
              pattern={{ value: nameRegex, message: 'Некорректный формат' }}
            />
            <Input
              className='lg:basis-1/2'
              label='компания'
              name='company'
              register={register}
              watch={watch}
              error={errors.company}
              required={'Пожалуйста, введите наименование компании'}
              touched={touchedFields.company}
              pattern={{ value: nameRegex, message: 'Некорректный формат' }}
            />
          </div>
          <div className='mb-i48 flex flex-col gap-x-gap lg:flex-row'>
            <PhoneInput
              className='mb-i48 basis-1/2 lg:mb-0'
              label='телефон'
              name='phone'
              register={register}
              requiredMark
              required
              watch={watch}
              control={control}
              touched={touchedFields.phone}
              error={errors.phone}
              pattern={{ value: phoneRegex, message: 'некорректный номер телефона' }}
            />
            <Input
              className='basis-1/2'
              label='email'
              name='email'
              type='email'
              register={register}
              watch={watch}
              error={errors.email}
              touched={touchedFields.email}
              required={watch('email')?.length === 0 ? 'Пожалуйста, введите почту' : false}
              pattern={{ value: emailRegex, message: 'некорректный формат электронной почты' }}
            />
          </div>
          <Input
            label='дополнительно'
            name='additionalText'
            register={register}
            watch={watch}
            error={errors.additionalText}
            touched={touchedFields.additionalText}
            pattern={{ value: textRegex, message: 'Некорректный формат' }}
          />
        </div>
      </div>
      <div className='mt-i80 grid grid-cols-4 gap-x-gap lg:mt-i32 lg:grid-cols-6'>
        <div className='col-span-4 flex flex-col gap-x-gap lg:col-start-3 lg:flex-row'>
          <div className='mb-i48 basis-1/2 text-white/16 lg:mb-0'>Captcha</div>
          <div className='basis-1/2 text-white'>
            <p className='p opacity-64'>отправляя форму вы соглашаетесь на обработку</p>{' '}
            <Link to='/' underline className='p'>
              персональных данных
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-i80 grid grid-cols-4 gap-x-gap lg:grid-cols-6'>
        <div className='col-span-4 flex gap-x-gap lg:col-start-3'>
          <Button
            wrapperClassName='!w-full'
            withoutMagnet
            className='w-full'
            iconRight='arrow-right'
            onClick={handleSubmit(submit)}
          >
            отправить
          </Button>
        </div>
      </div>
    </div>
  );
}
