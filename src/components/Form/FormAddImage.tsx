import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

interface CreateImageFormData {
  title: string,
  description: string,
  url: string,
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');

  const toast = useToast();

  const allowTypeImages = [
    'image/jpeg',
    'image/png',
    'image/gif'
  ]

  const queryClient = useQueryClient();
  const mutation = useMutation(async (imageData: CreateImageFormData) => {
    const response = await api.post('api/images', imageData, {});
    return response.data.user;
}, {
  onSuccess: () => {
    queryClient.invalidateQueries('api/images')
  }
});

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      ...register('image', {
        required: 'Arquivo obrigatório',
        validate: {
          lessThan10MB: image => image[0].size < 10000000 || 'O arquivo deve ser menor que 10MB',
          acceptedFormats: image => allowTypeImages.findIndex(typeimage => typeimage === image[0].type) >= 0 || 'Somente são aceitos arquivos PNG, JPEG e GIF'
          }
      })
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      ...register('title', {
        required: 'Título obrigatório',
        minLength: {
          value: 2,
          message: 'Mínimo de 2 caracteres'
        },
        maxLength: {
          value: 20,
          message: 'Máximo de 20 caracteres'
        },
      })
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      ...register('description', {
        required: 'Descrição obrigatória',
        maxLength: {
          value: 65,
          message: 'Máximo de 65 caracteres'
        },
      })
    },
  };

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl) {
        throw new Error('url_invalid');
      }
      // TODO EXECUTE ASYNC MUTATION
      const updateImageData = {
        title: String(data.title),
        description: String(data.description),
        url: imageUrl,
      }
      console.log(updateImageData)
      await mutation.mutateAsync(updateImageData);
      // TODO SHOW SUCCESS TOAST
      toast({
        title: "Imagem cadastrada",
        description: "Sua imagem foi cadastrada com sucesso.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } catch (err) {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      if (err === 'url_invalid') {
        toast({
          title: "Imagem não adicionada",
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
      else {
        toast({
          title: "Falha no cadastro",
          description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset({title: "", description: '', image: ''})
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          name='image'
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          onChange={async (e) => console.log(e)}
          // TODO SEND IMAGE ERRORS
          error={errors.image}
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          {...formValidations.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          // TODO SEND TITLE ERRORS
          error={errors.title}
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...formValidations.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          // TODO SEND DESCRIPTION ERRORS
          error={errors.description}
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...formValidations.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
