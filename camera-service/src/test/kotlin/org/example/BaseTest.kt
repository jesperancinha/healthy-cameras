package org.example

import com.github.frtu.kotlin.utils.io.ResourceHelper
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import java.util.function.Consumer
import java.util.function.Supplier

@DisplayName("Basic tests")
@ExtendWith(MockKExtension::class)
internal class BaseTest {
    @MockK
    lateinit var supplier: Supplier<String>

    @Test
    fun `Positive test cases`() {
        //--------------------------------------
        // 0. Prepare MOCK
        //--------------------------------------
        val result = "test"
        every {
            supplier.get()
        } returns result

        //--------------------------------------
        // 1. Init
        //--------------------------------------
        var captured: String? = null
        val consumer: Consumer<String> = Consumer { str ->
            captured = str
        }

        //--------------------------------------
        // 2. Execute
        //--------------------------------------
        consumer.accept(supplier.get())

        //--------------------------------------
        // 3. Validate
        //--------------------------------------
        assertThat(captured).isEqualTo(result)
    }

    @Test
    fun `Negative test cases`() {
        assertThrows<IllegalStateException>("Testing negative state") {
            throw IllegalStateException()
        }
    }

    @Test
    fun `Reading data`() {
        //--------------------------------------
        // 1. Init
        //--------------------------------------
        val text = ResourceHelper().readFromFile("classpath:data/sample.txt")
        //--------------------------------------
        // 3. Validate
        //--------------------------------------
        assertThat(text).isEqualTo("text")
    }
}