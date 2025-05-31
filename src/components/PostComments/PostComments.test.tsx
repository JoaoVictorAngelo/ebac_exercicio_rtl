import { fireEvent, render, screen } from '@testing-library/react'
import Post from '.'

describe('Teste para o componente Post', () => {
    test('Deve renderizar o componente corretamente', () => {
        render(<Post />)
        expect(screen.getByTestId('comment-button')).toBeInTheDocument()
        expect(screen.getByTestId('comment-textarea')).toBeInTheDocument()
    })

    test('Deve permitir a inserção de dois comentários', () => {
        render(<Post />)

        // Seleciona os elementos pelo data-testid
        const textarea = screen.getByTestId('comment-textarea')
        const button = screen.getByTestId('comment-button')

        // Insere o primeiro comentário
        const primeiroComentario = 'Este é o primeiro comentário'
        fireEvent.change(textarea, { target: { value: primeiroComentario } })
        fireEvent.click(button)

        // Insere o segundo comentário
        const segundoComentario = 'Este é o segundo comentário';
        fireEvent.change(textarea, { target: { value: segundoComentario } });
        fireEvent.click(button);

        // Verifica se ambos os comentários estão na lista
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
        expect(screen.getByText(primeiroComentario)).toBeInTheDocument();
        expect(screen.getByText(segundoComentario)).toBeInTheDocument();
    });
});

